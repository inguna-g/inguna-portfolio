// script.js

// Light/Dark mode toggle with ARIA updates and persistence
const toggleBtn = document.getElementById('toggleTheme'); // This might be null on some pages

// Wrap the theme logic in a check to ensure toggleBtn exists
if (toggleBtn) { // Only run this code if the toggleBtn element exists
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark');
            toggleBtn.setAttribute('aria-pressed', 'true');
        } else {
            document.body.classList.remove('dark');
            toggleBtn.setAttribute('aria-pressed', 'false');
        }
    }

    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        applyTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
} else {
    // Optional: console.log for debugging if the button is missing
    // console.log("Toggle theme button not found on this page. Skipping theme toggle logic.");
}


// image-zoom.js (This part should now work after the fix above)

document.addEventListener('DOMContentLoaded', function() {
    // Get the modal, image, and caption elements
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('img01');
    const closeButton = document.querySelector('.close-button');

    // Add a check to ensure the modal elements exist before proceeding
    if (!modal || !modalImg || !closeButton) {
        console.warn("Modal elements not found. Image zoom functionality will not work on this page.");
        return; // Exit if modal elements are missing
    }

    // Get all images that should be clickable
    const images = document.querySelectorAll('.story-block img');

    // Loop through each image and add a click event listener
    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'flex'; // Use flex to center content
            modalImg.src = this.getAttribute('data-original') || this.src; 
        });
    });

    // When the user clicks on the close button (x), close the modal
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // When the user clicks anywhere outside of the modal content, close it
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Optional: Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
});