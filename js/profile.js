
$(document).ready(() => {
    const currentPath = window.location.pathname; // Get the current path

    // Check if the current path is related to profile management
    if (currentPath.includes("profile")) { // Adjust this condition based on your actual route structure
        var profileData;
        const addProfileForm = $(".add-profile-form");
        const updateProfileForm = $(".update-profile-form");
        const profileDisplay = $(".profile-show");
        const updateProfileButton = $(".update-profile-button");

        // Toggle between add and update forms
        updateProfileButton.click(function () {
            updateProfileForm.toggle();
            profileDisplay.toggle();
        });

        // Initial state: hide forms and display
        addProfileForm.hide();
        updateProfileForm.hide();
        profileDisplay.hide();

        checkProfileData();

        function checkProfileData() {
            $.ajax({
                url: Host + '/Profile.php',
                type: 'post',
                crossDomain: true, // Enable CORS
                data: {
                    "data": "all",

                    "user": user,
                },
                success: function (response) {
                    profileData = JSON.parse(response);
                    if (!profileData["name"] && !profileData["cname"]) {
                        addProfileForm.show();
                        updateProfileForm.hide();
                        profileDisplay.hide();
                    } else {
                        displayProfileData(profileData);
                    }
                }
            });
        }

        function displayProfileData(data) {
            addProfileForm.hide();
            updateProfileForm.hide();
            profileDisplay.show();

            $("#display-name").html(data['name']);
            $("#display-company-name").html(data['cname']);
            $("#display-mobile").html(data['num']);
            $("#display-address").html(data['add']);

            $("#update-name").val(data['name']);
            $("#update-company-name").val(data['cname']);
            $("#update-mobile-number").val(data['num']);
            $("#update-address").val(data['add']);
        }

        $(".update-password-button").click(function () {
            $("#password-update-form").toggle();
        });

        // Add profile data for the first time
        $(".add-profile-form").submit(function (event) {
            event.preventDefault(); // Prevent default form submission

            var name = $("#name").val();
            var cname = $("#company-name").val();
            var mob = $("#mobile-number").val();
            var address = $("#address").val();

            if (name && cname && mob && address) {
                $.ajax({
                    url: Host + '/Profile.php',
                    type: 'post',
                    crossDomain: true, // Enable CORS
                    data: {
                        "data": "add",
                        "user": user,
                        "name": name,
                        "cname": cname,
                        "mob": mob,
                        "add": address,
                    },
                    success: function (response) {
                        if (response === 'Profile updated successfully.') {
                            checkProfileData(); // Refresh data
                        } else {
                            alert("Error adding profile");
                        }
                    }
                });
            }
        });

        $(".update-profile-form").submit(function (event) {
            event.preventDefault(); // Prevent default form submission

            var name = $("#update-name").val();
            var cname = $("#update-company-name").val();
            var mob = $("#update-mobile-number").val();
            var address = $("#update-address").val();
            if (name && cname && mob && address) {
                $.ajax({
                    url: Host + '/Profile.php',
                    type: 'post',
                    crossDomain: true, // Enable CORS
                    data: {
                        "data": "update",
                        "user": user,
                        "name": name,
                        "cname": cname,
                        "mob": mob,
                        "add": address
                    },
                    success: function (response) {
                        if (response === '"Profile updated successfully."') {
                            checkProfileData(); // Refresh data
                        } else {
                            alert("Error updating profile");
                        }
                    }
                });
            }
        });

        $(".password-form").off("submit").on("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            var currentPassword = $("#current-password").val();
            var newPassword = $("#new-password").val();
            var confirmNewPassword = $("#retype-new-password").val();

            if (currentPassword && newPassword && confirmNewPassword && newPassword === confirmNewPassword) {
                // Disable the submit button to prevent multiple submissions
                const $submitButton = $(this).find('input[type="submit"]');
                $submitButton.prop('disabled', true);

                $.ajax({
                    url: Host + '/Profile.php',
                    type: 'post',
                    crossDomain: true, // Enable CORS
                    data: {
                        "data": "pwd",
                        "user": user,
                        "pwd": currentPassword,
                        "npwd": newPassword,
                    },
                    success: function (response) {
                        if (response === '"Password updated successfully."') {
                            alert("Password updated successfully");
                        } else {
                            alert("Error updating password");
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.error(textStatus, errorThrown);
                        alert("An error occurred while updating the password");
                    },
                    complete: function () {
                        // Re-enable the submit button after processing
                        $submitButton.prop('disabled', false);
                    }
                });
            } else {
                alert("Please fill in all fields correctly and ensure passwords match.");
            }
        });
    }
});