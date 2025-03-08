$(document).ready(() => {
    const currentPath = window.location.pathname;

    const jsPDF = window.jspdf.jsPDF;
    if (currentPath.includes("report")) {
        const PDF_CONTAINER_ID = 'pdfdata';
        const TABLE_HEADERS = [
            'SrNo', 'Date', 'From', 'To', 'Oname', 'Tname',
            'VNum', 'Size', 'Rate', 'Adv', 'Balance',
            'Other', 'Rbalance', 'Dbalance'
        ];
        const COLUMN_MAP = {
            srno: 0, date: 1, from: 2, to: 3, oname: 4,
            tname: 5, vnum: 6, size: 7, rate: 8, adv: 9,
            bal: 10, other: 11, rbal: 12, dbal: 13
        };

        let checkdata = [];
        let searchTimeout;
        let tdata = []; // Placeholder for table data

        attachEventListeners();

        function attachEventListeners() {
            // Attach event listeners for search radio buttons
            $("input[name='search']").change(handleRadioSelection);
            $("input[name='sort']").click(handleSorting);

            // Attach event listeners for input fields
            ['srno', 'oname', 'tname'].forEach(field => {
                $(`#${field}-input`).on("keyup", (event) => searchField(field, event.target.value));
            });

            // Event delegation for checkboxes
            $(document).on('click', 'input[type="checkbox"]', handleCheckboxClick);

            // Download button event listener
            $('#download-button').on('click', () => downloadPDF(tdata));
        }

        function handleCheckboxClick() {
            checkdata = $('input[type="checkbox"]:checked').map((_, cb) => cb.value).get();
            updateColumnVisibility();
        }

        function updateColumnVisibility() {
            const pdfContainer = $(`#${PDF_CONTAINER_ID}`);
            pdfContainer.find("th, td").show(); // Reset display property

            checkdata.forEach(column => {
                const index = COLUMN_MAP[column];
                if (index !== undefined) {
                    pdfContainer.find(`th:nth-child(${index + 1}), td:nth-child(${index + 1})`).hide();
                }
            });
        }

        function handleRadioSelection() {
            const selectedOption = $('input[name="search"]:checked').val();
            ['srno', 'oname', 'tname'].forEach(field => $(`#${field}-input`).hide());
            $(`#${selectedOption}-input`).show();

            const requestData = { 'All': 'all', 'bpaid': 'paid', 'bnpaid': 'npaid' };
            if (requestData[selectedOption]) {
                fetchData(requestData[selectedOption]);
            }
        }

        function fetchData(data) {
            $.ajax({
                type: "POST",
                url: `${Host}/Report.php`,
                data: { data, user },
                success: handleDataResponse,
                error: (jqXHR, textStatus, errorThrown) => {
                    console.error(`Error fetching data: ${textStatus} - ${errorThrown}`);
                    alert("An error occurred while fetching data. Please try again later.");
                }
            });
        }

        function handleDataResponse(data) {
            if (data === 'No data found.') {
                alert("No data found.");
            } else if (data === 'error') {
                alert("An error occurred while processing your request.");
            } else {
                try {
                    tdata = JSON.parse(data);
                    updateDataDisplay(tdata);
                } catch (e) {
                    console.error("Error parsing data response:", e);
                    alert("An error occurred while processing the data. Please try again.");
                }
            }
        }

        function handleSorting() {
            const sortOptions = {
                srno: (a, b) => a.srno - b.srno,
                oname: (a, b) => a.oname.localeCompare(b.oname),
                tname: (a, b) => a.tname.localeCompare(b.tname),
                date: (a, b) => new Date(a.date) - new Date(b.date)
            };

            const selectedSort = $('input[name="sort"]:checked').val();
            if (sortOptions[selectedSort]) {
                tdata.sort(sortOptions[selectedSort]);
                updateDataDisplay(tdata);
            } else {
                console.warn("No valid sort option selected.");
            }
        }

        function searchField(field, value) {
            value = value.trim();
            if (value === '') return;

            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                $('#loading-indicator').show();
                $.ajax({
                    type: "POST",
                    url: `${Host}/Report.php`,
                    data: { data: 'search_' + field, user, [field]: value },
                    success: handleDataResponse,
                    error: (jqXHR, textStatus, errorThrown) => {
                        console.error(`Error occurred while searching: ${textStatus} - ${errorThrown}`);
                        alert("An error occurred while searching. Please try again.");
                    }
                });
            }, 300);
        }

        function updateDataDisplay(tdata) {
            const pdfContainer = $(`#${PDF_CONTAINER_ID}`);
            const tableHTML = `
                <table border="1">
                    <thead>
                        <tr>${TABLE_HEADERS.map(header => `<th>${header}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                        ${tdata.map(value => `
                            <tr>
                                <td>${value.srno || ''}</td>
                                <td>${value.date || ''}</td>
                                <td>${value.from_ || ''}</td>
                                <td>${value.to_ || ''}</td>
                                <td>${value.oname || ''}</td>
                                <td>${value.tname || ''}</td>
                                <td>${value.vnum || ''}</td>
                                <td>${value.size || ''}</td>
                                <td>${value.rate || ''}</td>
                                <td>${value.adv || ''}</td>
                                <td>${value.bal || ''}</td>
                                <td>${value.other || ''}</td>
                                <td>${value.rbal || ''}</td>
                                <td>${value.dbal || ''}</td>
                            </tr>`).join('')}
                    </tbody>
                </table>`;
            pdfContainer.html(tableHTML);
            updateColumnVisibility();
        }

        function downloadPDF(tdata) {
            // Validate input data
            if (!Array.isArray(tdata) || tdata.length === 0) {
                console.error('No valid data available for PDF generation');
                alert("No data available to generate PDF.");
                return;
            }

            // Create a new PDF document
            var pdf = new jsPDF('l', 'mm', [420, 297]);
            const margin = 5; // Margin for the PDF
            const startY = margin; // Start position for the first row

            // Prepare data for the PDF with explicit mapping and handling "null" strings
            const pdfData = tdata.map(item => {
                return {
                    SrNo: item.srno || '',
                    Date: item.date || '',
                    From: item.from_ || '',
                    To: item.to_ || '',
                    Oname: item.oname || '',
                    Tname: item.tname || '',
                    VNum: item.vnum || '',
                    Size: item.size || '',
                    Rate: item.rate || '',
                    Adv: item.adv || '',
                    Balance: item.bal || '',
                    Other: item.other || '',
                    Rbalance: item.rbal || '',
                    Dbalance: item.dbal || ''
                };
            });

            // Define visible headers based on unchecked checkbox states
            const visibleHeaders = TABLE_HEADERS.filter(header => {
                const headerValue = header.toLowerCase();
                return !$("input[type='checkbox'][value='" + headerValue + "']").is(':checked');
            });

            const pdfBody = pdfData.map(item =>
                visibleHeaders.map(header => item[header] || '') // Use empty string if data is missing
            );

            // Add headers and body to the PDF
            pdf.autoTable({
                head: [visibleHeaders],
                body: pdfBody,
                startY: startY,
                margin: { top: margin },
                theme: 'grid',
                styles: {
                    cellPadding: 5,
                    fontSize: 10,
                    overflow: 'linebreak', // Handle long text
                    minCellHeight: 10 // Set a minimum cell height
                },
                headStyles: {
                    fillColor: [76, 175, 80],
                    textColor: [255, 255, 255]
                },
                didDrawPage: function (data) {
                    // Add a footer with page number
                    pdf.setFontSize(10);
                    pdf.text(`Page ${data.pageCount}`, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 10);
                }
            });

            // Save the PDF with a dynamic filename
            const filename = `Table_${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(filename);
        }
    }
}); 