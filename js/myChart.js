$(document).ready(function () {
    const currentPath = window.location.pathname; // Get the current path

    // Check if the current path is related to profile management
    if (currentPath.includes("profile")) { // Adjust this condition based on your actual route structure
        $(document).ready(function () {
            fetchGraphData();
        });
    }

    function fetchGraphData() {
        // Fetch remaining balance
        $.ajax({
            url: `${Host}/Profile.php`,
            type: 'post',
            data: { "data": "remain", "user": user },
            success: function (response) {
                if (response === "Invalid email format." || response === 0) {
                    $("#remaining-info").html("No data present");
                } else {
                    $("#remaining-info").html("Total balance remaining is " + response);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching remaining balance:", error);
                $("#remaining-info").html("Error fetching data");
            }
        });

        // Fetch graph data
        $.ajax({
            url: `${Host}/Profile.php`, // Updated URL
            type: 'post',
            data: {
                "data": "graph",
                "user": user
            },
            success: function (response) {
                try {
                    var xyValues = JSON.parse(response);

                    // Check if xyValues is an array and has data
                    if (Array.isArray(xyValues) && xyValues.length > 0) {
                        var xValues = xyValues.map(item => item.x); // Assuming item.x is a date
                        var yValues = xyValues.map(item => item.y);

                        renderChart(xValues, yValues); // Call the renderChart function with new data
                    } else {
                        console.warn("No data available for the graph.");
                        $("#chart-error").html("No data available for the graph.");
                    }
                } catch (error) {
                    console.error("Error parsing graph data:", error);
                    $("#chart-error").html("Error parsing graph data.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching chart data:", error);
                $("#chart-error").html("Error fetching chart data");
            }
        });
    }

    function renderChart(xValues, yValues) {
        const ctx = document.getElementById('myChart').getContext('2d');

        try {
            window.myChart = new Chart(ctx, {
                type: "bar", // Change to bar chart
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'Data Values', // Optional label for the dataset
                        backgroundColor: "rgba(0, 123, 255, 0.6)", // Set bar color
                        borderColor: "rgba(0, 123, 255, 1)", // Set border color
                        borderWidth: 1, // Set border width
                        data: yValues
                    }]
                },
                options: {
                    responsive: true, // Make the chart responsive
                    maintainAspectRatio: false, // Allow height to be set
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date' // Label for the x-axis
                            },
                            ticks: {
                                autoSkip: true, // Automatically skip ticks if there are too many
                                maxTicksLimit: 20 // Limit the number of ticks on the x-axis
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Values' // Label for the y-axis
                            },
                            min: Math.min(...yValues), // Set minimum y-axis value
                            max: Math.max(...yValues)  // Set maximum y-axis value
                        }
                    }
                }
            });
        } catch (error) {
            console.error("Error creating chart:", error);
        }
    }
});