$(document).ready(function () {
    // auth.js
    const Host = './backend';
    window.Host = Host;


    user = sessionStorage.getItem('user');
    window.user ='123@gmail.com';
    const currentPath = window.location.pathname; // Get the current path

    // Check if the current path is related to profile management
    if (currentPath.includes("profile") || currentPath.includes("entry") || currentPath.includes("report")) { // Adjust this condition based on your actual route structure


        if (!user) {
            window.location.href = "/login";
        }
    }
})