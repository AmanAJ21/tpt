$(document).ready(function () {
    const currentPath = window.location.pathname; // Get the current path
    // Check if the current path is one of the specified routes
    if (currentPath.includes("entry")) {
        // Cache jQuery selectors
        const $entryTitles = $('.entry-title');
        const $addError = $("#entry-error-add"); // Updated ID
        const $updateError = $("#entry-error-update"); // Updated ID
        const $deleteError = $("#entry-error-delete"); // Updated ID

        // Click event for entry titles
        $entryTitles.on('click', function () {
            const $this = $(this);
            $entryTitles.removeClass("active"); // Remove active class from all
            $this.toggleClass('active'); // Toggle active class on clicked title
            clearErrors(); // Clear error messages
        });

        // Utility function to display error messages
        function displayError($selector, message, color = "red") {
            $selector.html(message).css("color", color);
        }

        // Utility function to clear error messages
        function clearErrors() {
            $addError.empty();
            $updateError.empty();
            $deleteError.empty();
        }

        /* Add Entry */
        $("#entry-form-add").submit(function (event) {
            event.preventDefault(); // Prevent default form submission

            // Function to gather form data
            const gatherFormData = () => {
                return {
                    srno: $("#entry-srno").val(),
                    from: $("#entry-from").val(),
                    tname: $("#entry-transport-name").val(),
                    to: $("#entry-to").val(),
                    vnum: $("#entry-vehicle-number").val(),
                    rate: $("#entry-rate").val(),
                    bal: $("#entry-balance").val(),
                    date: $("#entry-date").val(),
                    oname: $("#entry-owner-name").val(),
                    size: $("#entry-size-weight").val(),
                    adv: $("#entry-advance").val(),
                    other: $("#entry-other").val(),
                    rbal: $(":radio:checked").val(),
                    dbal: $("#entry-balance-other").val()
                };
            };

            const formData = gatherFormData();

            // Clear previous error messages
            $addError.empty();

            // Basic validation
            const requiredFields = ['srno', 'from', 'tname', 'to', 'vnum', 'rate'];
            for (const field of requiredFields) {
                if (!formData[field]) {
                    displayError($addError, `Please fill in the ${field} field.`);
                    return;
                }
            }

            $.ajax({
                url: Host + '/Entry.php',
                type: 'post',
                data: {
                    "data": "add",
                    "user": user,
                    ...formData // Spread operator to include all form data
                },
                success: function (response) {
                    if (response === 1) {
                        alert("Data Added Successfully");
                        // Optionally reset the form
                        $("#entry-form-add")[0].reset();
                        $addError.empty(); // Clear any previous error messages
                    } else {
                        displayError($addError, "Error adding data");
                    }
                },
                error: function (xhr, status, error) {
                    console.error("AJAX Error:", status, error);
                    displayError($addError, "An error occurred while adding data.");
                }
            });
        });


        /* Check if Sr.No already exists */
        let debounceTimer; // Variable to hold the debounce timer

        $("#entry-srno").on("input", function () {
            const srno = $(this).val(); // Use 'this' to get the current input value
            const submitButton = $("input[type='submit']");

            // Clear previous debounce timer
            clearTimeout(debounceTimer);

            // Set a new debounce timer
            debounceTimer = setTimeout(() => {
                if (srno) { // Only proceed if there is input
                    $.ajax({
                        url: Host + '/Entry.php',
                        type: 'post',
                        data: {
                            "data": "change",
                            "user": user,
                            "srno": srno
                        },
                        success: function (response) {
                            if (response === srno) {
                                displayError($addError, "Sr.No already present");
                                submitButton.removeClass('grayText').prop('disabled', true);
                            } else {
                                $addError.empty(); // Clear previous error messages
                                submitButton.addClass('grayText').prop('disabled', false);
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("AJAX Error: ", status, error);
                        }
                    });
                } else {
                    // If input is empty, enable the submit button and clear errors
                    $addError.empty();
                    submitButton.addClass('grayText').prop('disabled', false);
                }
            }, 300); // Adjust debounce time as needed (300 ms here)
        });


        /* Update Search */
        $("#entry-form-update-search").submit(function (event) {
            event.preventDefault(); // Prevent default form submission

            const srno = $("#entry-update-srno").val();
            $.ajax({
                url: Host + '/Entry.php',
                type: 'post',
                data: {
                    "data": "sea",
                    "user": user,
                    "srno": srno
                },
                success: function (response) {
                    const data = JSON.parse(response);
                    if (data === 'error') {
                        displayError($updateError, "Error searching data");
                    } else if (data.length > 0) {
                        $("#entry-form-update-search").hide();
                        $("#entry-form-update").show();
                        $('#entry-update-search-button').show();
                        $("#entry-update-form-srno").val(data[0]);
                        $("#entry-update-from").val(data[1]);
                        $("#entry-update-transport-name").val(data[2]);
                        $("#entry-update-to").val(data[3]);
                        $("#entry-update-vehicle-number").val(data[4]);
                        $("#entry-update-rate").val(data[5]);
                        $("#entry-update-balance").val(data[6]);
                        $("#entry-update-date").val(data[7]);
                        $("#entry-update-owner-name").val(data[8]);
                        $("#entry-update-size-weight").val(data[9]);
                        $("#entry-update-advance").val(data[10]);
                        $("#entry-update-other").val(data[11]);
                        $("input:radio[name='entry-update-balance-paid'][value='" + data[12] + "']").prop('checked', true);
                        $("#entry-update-balance-other").val(data[13]);
                    } else {
                        displayError($updateError, "Data not found.");
                    }
                },
                error: function (xhr, status, error) {
                    console.error("AJAX Error: ", status, error);
                }
            });
        });


        $("#entry-form-update").submit(function (event) {
            event.preventDefault(); // Prevent default form submission

            // Gather form data
            const srno = $("#entry-update-form-srno").val();
            const from = $("#entry-update-from").val();
            const tname = $("#entry-update-transport-name").val();
            const to = $("#entry-update-to").val();
            const vnum = $("#entry-update-vehicle-number").val();
            const rate = $("#entry-update-rate").val();
            const bal = $("#entry-update-balance").val();
            const date = $("#entry-update-date").val();
            const oname = $("#entry-update-owner-name").val();
            const size = $("#entry-update-size-weight").val();
            const adv = $("#entry-update-advance").val();
            const other = $("#entry-update-other").val();
            const rbal = $(":radio:checked").val();
            const dbal = $("#entry-update-balance-other").val();

            // Perform AJAX request to update data
            $.ajax({
                url: Host + '/Entry.php',
                type: 'post',
                data: {
                    "data": "update",
                    "user": user,
                    "srno": srno,
                    "from": from,
                    "tname": tname,
                    "to": to,
                    "vnum": vnum,
                    "rate": rate,
                    "bal": bal,
                    "date": date,
                    "oname": oname,
                    "size": size,
                    "adv": adv,
                    "other": other,
                    "rbal": rbal,
                    "dbal": dbal
                },
                success: function (response) {

                    if (response === 1) {

                        alert("Data Updated Successfully");

                        $("#entry-form-update").hide();
                        $("entry-update-search-button").hide();
                        $("#entry-form-update-search").show();                       // Optionally, you can reset the form or perform other actions here
                        $("#entry-form-update")[0].reset(); // Reset the form if needed
                    } else {
                        alert("Error updating data: " + response); // Show error message with response
                    }
                },
                error: function (xhr, status, error) {
                    console.error("AJAX Error: ", status, error);
                    alert("An error occurred while updating data. Please try again.");
                }
            });
        });
        $("#entry-update-search-button").click(function () {
            $("#entry-form-update").hide(); // Hide the update form
            $("#entry-update-search-button").hide(); // Hide the search button
            $("#entry-form-update-search").show(); // Show the search form
        });

        /* Delete Search */
        $("#entry-form-delete-search").submit(function (event) {
            event.preventDefault(); // Prevent default form submission

            const srno = $("#entry-delete-srno").val();
            $.ajax({
                url: Host + '/Entry.php',
                type: 'post',
                data: {
                    "data": "sea",
                    "user": user,
                    "srno": srno
                },
                success: function (response) {
                    const data = JSON.parse(response);
                    if (data === 'error') {
                        alert("Error searching data");
                        displayError($('#updateError'), "Error searching data");
                    } else if (data.length > 0) {
                        // Populate delete confirmation form with data
                        $("#entry-form-delete-search").hide();
                        $("#entry-form-delete").show();
                        $("#entry-delete-search-button").show();                      $("#entry-delete-srno-display").text(data[0]);
                        $("#entry-delete-from").text(data[1]);
                        $("#entry-delete-transport-name").text(data[2]);
                        $("#entry-delete-vehicle-number").text(data[3]);
                        $("#entry-delete-rate").text(data[4]);
                        $("#entry-delete-balance").text(data[5]);
                        $("#entry-delete-balance-paid").text(data[6]);
                        $("#entry-delete-date").text(data[7]);
                        $("#entry-delete-to").text(data[8]);
                        $("#entry-delete-owner-name").text(data[9]);
                        $("#entry-delete-size-weight").text(data[10]);
                        $("#entry-delete-advance").text(data[11]);
                        $("#entry-delete-other").text(data[12]);
                        $("#entry-delete-balance-other").text(data[13]);
                    } else {
                        alert("Data not found."); // Alert for no data found
                        displayError($('#updateError'), "Data not found.");
                    }
                },
                error: function (xhr, status, error) {
                    console.error("AJAX Error: ", status, error);
                    displayError($('#updateError'), "An error occurred while searching data.");
                }
            });
        });

        $("#entry-delete-search-button").click(function () {
            $("#entry-form-delete").hide(); // Hide the update form
            $(this).hide(); // Hide the search button
            $("#entry-form-delete-search").show(); // Show the search form
        });

        /* Delete Entry */
$("#entry-form-delete").submit(function (event) {
    event.preventDefault(); // Prevent default form submission

    const srno = $("#entry-delete-srno-display").text(); // Get SR No from display

    // Use SweetAlert for confirmation
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: Host + '/Entry.php',
                type: 'post',
                data: {
                    "data": "delete",
                    "user": user,
                    "srno": srno
                },
                success: function (response) {
                    if (response === 1) {
                        Swal.fire(
                            'Deleted!',
                            'Entry deleted successfully.',
                            'success'
                        );
                        // Optionally reset or hide forms
                        $('#updateError').empty();
                        $("#entry-form-delete")[0].reset();
                        $("#entry-form-delete").hide();
                        $("#entry-delete-search-button").hide();
                        $("#entry-form-delete-search").show(); // Show search form again
                    } else {
                        displayError($('#updateError'), "Error deleting entry.");
                    }
                },
                error: function (xhr, status, error) {
                    console.error("AJAX Error:", status, error);
                    displayError($('#updateError'), "An error occurred while deleting data.");
                }
            });
        }
    });
});

    }
});