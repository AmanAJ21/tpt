
  // Function to fetch HTML content from a file
  const fetchHTML = async (file) => {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.error(`Error fetching HTML for ${file}:`, error);
      return null; // Indicate failure to fetch
    }
  };

  // Define routes and their corresponding HTML files
  const routes = {
    '/': './pages/home.html',
    '/create': './pages/create.html',
    '/login': './pages/login.html',
    '/reset': './pages/reset.html',
    '/profile': './pages/profile.html',
    '/entry': './pages/entry.html',
    '/report': './pages/report.html',
  };

  // Function to parse the current location
  const parseLocation = () => location.pathname.toLowerCase() || '/';

  // Function to find the corresponding HTML file based on the current path
  const findFileByPath = (path) => routes[path] || 'pages/error.html';

  // Function to execute scripts in the injected HTML - SAFER VERSION
  const executeScripts = (htmlContent) => {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = htmlContent; // Set the HTML content

    // Find all script tags within the app div
    const scripts = appDiv.querySelectorAll('script');

    scripts.forEach(script => {
      const newScript = document.createElement('script');
      // Copy attributes from the original script to the new script
      Array.from(script.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.text = script.text; // Copy the script's content

      script.parentNode.replaceChild(newScript, script); // Replace the old script with the new one
    });
  };

  // Router function
  const router = async () => {
    const path = parseLocation();
    const htmlFile = findFileByPath(path);

    const htmlContent = await fetchHTML(htmlFile);
    if (htmlContent) {
      executeScripts(htmlContent);
    } else {
      // fetchHTML already logs an error, so just display a generic message
      document.getElementById('app').innerHTML = '<h1>Error loading page</h1>';
    }
  };

  // Function to handle navigation
  const handleNavigation = (path) => {
    history.pushState(null, null, path);
    router();
  };

  // Attach click event listeners to all anchor tags
  document.addEventListener('DOMContentLoaded', () => {
    // Attach a click event listener to the document
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        handleNavigation(path);
      }
    });

    // Initial load
    router();

    // Handle popstate events (back/forward navigation)
    window.addEventListener('popstate', router);
  });
