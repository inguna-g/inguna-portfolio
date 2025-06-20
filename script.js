// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Ensure the theme toggle button exists on the page before attaching listeners
    if (themeToggle) {
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme'); // Will be 'dark' or 'light'
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        // Function to apply the theme class and update the button icon
        function applyTheme(themeClass) {
            if (themeClass === 'dark') { // Changed from 'dark-mode' to 'dark'
                body.classList.add('dark'); // Use 'dark' class
                themeToggle.textContent = '☀️'; // Sun icon for dark mode
                themeToggle.setAttribute('aria-pressed', 'true');
            } else { // 'light' or empty string from localStorage
                body.classList.remove('dark'); // Remove 'dark' class
                themeToggle.textContent = '🌙'; // Moon icon for light mode
                themeToggle.setAttribute('aria-pressed', 'false');
            }
        }

        // Apply theme on page load
        if (savedTheme === 'dark') { // If user explicitly saved dark mode
            applyTheme('dark');
        } else if (savedTheme === 'light') { // If user explicitly saved light mode
            applyTheme('light');
        } else { // If no preference saved, use system preference
            applyTheme(prefersDarkScheme.matches ? 'dark' : 'light');
        }

        // Event listener for toggle button click
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark'); // Toggle 'dark' class
            localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Save preference as 'dark' or 'light'
            themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            themeToggle.textContent = isDark ? '☀️' : '🌙'; // Update icon
        });
    }


    // --- Image Modal Logic ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('img01');
    const modalCaption = document.getElementById('modalCaption');
    const closeButton = document.querySelector('.close-button');

    // Add a check to ensure the modal elements exist before proceeding
    if (!modal || !modalImg || !closeButton || !modalCaption) {
        // This is expected on pages like eforto.html where images were removed, so no console.warn needed.
        return; // Exit if modal elements are missing
    }

    const images = document.querySelectorAll('.story-block img');

    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.getAttribute('data-original') || this.src;
            const captionText = this.nextElementSibling ? this.nextElementSibling.textContent : this.alt;
            modalCaption.textContent = captionText;
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal || event.target === modalImg) { // Also close if modal image itself is clicked
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
});