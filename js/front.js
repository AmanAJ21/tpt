$(document).ready(() => {
    const emailRegex = /^\w+@\w+\.\w{3}$/; // Regular expression for validating email format
    const $emailInput = $("#email-input"); // Cache the jQuery selector for the email input
    const $submitButton = $("input.button-submit"); // Cache the jQuery selector for the submit button

    // Function to update button state based on email validity
    const updateButtonState = (isValidEmail) => {
        if (isValidEmail) {
            $submitButton.css({
                'background-color': 'green',
                'color': 'white' // Optional: change text color for better contrast
            }).removeClass('grayText').prop('disabled', false); // Enable button
        } else {
            $submitButton.css({
                'background-color': 'orange',
                'color': 'black' // Optional: reset text color
            }).addClass('grayText').prop('disabled', true); // Disable button
        }
    };

    // Event handler for input changes in the email field
    $emailInput.on('input', function () {
        const isValidEmail = emailRegex.test($(this).val()); // Test the current value against the regex
        updateButtonState(isValidEmail); // Update button state based on validity
    });

    // Trigger input event on page load to initialize button state
    $emailInput.trigger('input');

    /* Login */
    $("[name='login']").on("submit", function (event) {
        var user = $("[name='email']").val();
        var pwd = $("[name='password']").val();
        if ((user !== "") && (pwd !== "")) {
            $.ajax({
                url: Host + '/Form.php',
                type: 'post',
                data: {
                    "login": "1",
                    "user": user,
                    "pwd": pwd
                },
                success: function (response) {
                    if (response === "Login successful.") {
                        sessionStorage.setItem("user", user);
                        window.location.href = "/profile";
                    } else {
                        $("[name='password']").val("");
                        $('.error-message').html(response);
                        $('.error-message').addClass('visible'); // Use jQuery to add the class
                        setTimeout(() => {
                            $('.error-message').removeClass('visible'); // Hide the message after a timeout
                            $('.error-message').html(''); // Clear the message content
                        }, 10000);
                    }
                }
            });
        }
        event.preventDefault();
    });

    /* Reset Password */
    $("[name='reset-password']").on("submit", function (event) {
        var user = $("[name='email']").val();
        if (user !== "") {
            $('.loader').css("display", "grid");
            $.ajax({
                url: Host + '/Form.php',
                type: 'post',
                data: {
                    "reset": "1",
                    "user": user,
                },
                success: function (response) {
                    $('.loader').css("display", "none");

                    if (response === 'New password sent to your email.') {
                        $('.success-message').html("New password sent to your email."); // Set the success message
                        setTimeout(() => {
                            $('.success-message').css('display', 'none'); // Hide the message after a timeout
                            $('.success-message').html(''); // Clear the message content
                        }, 8000);
                    } else {
                        $("[name='lpwd']").val("");
                        $('.error-message').html(response);
                        $('.error-message').addClass('visible'); // Use jQuery to add the class
                        setTimeout(() => {
                            $('.error-message').removeClass('visible'); // Hide the message after a timeout
                            $('.error-message').html(''); // Clear the message content
                        }, 10000);
                    }
                }
            });
        }
        event.preventDefault();
    });

    /* Create Account */
    $("[name='create-account']").on("submit", function (event) {
        var user = $("[name='email']").val();
        var pwd = $("[name='password']").val();
        var rpwd = $("[name='rpassword']").val();

        if ((user !== "") && (pwd === rpwd) && (rpwd !== "")) {
            $.ajax({
                url: Host + '/Form.php',
                type: 'post',
                data: {
                    "create": "1",
                    "user": user,
                    "pwd": pwd,
                    "rpwd": rpwd,
                },
                success: function (response) {
                    if (response === 'User created successfully.') {
                        $('.success-message').html("User created successfully."); // Set the success message
                        setTimeout(() => {
                            $('.success-message').css('display', 'none'); // Hide the message after a timeout
                            $('.success-message').html(''); // Clear the message content
                        }, 8000); // Adjust this duration as needed
                    } else {
                        $('.error-message').html(response);
                        $('.error-message').addClass('visible'); // Use jQuery to add the class
                        setTimeout(() => {
                            $('.error-message').removeClass('visible'); // Hide the message after a timeout
                            $('.error-message').html(''); // Clear the message content
                        }, 10000);
                    }
                }
            });
        }
        event.preventDefault();
    });
});