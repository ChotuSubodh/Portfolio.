document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth scrolling for navigation links ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href').substring(1); // Get the section ID
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Calculate scroll position, accounting for fixed header height
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth' // Smooth scroll effect
                });
            }
        });
    });

    // --- Highlight active navigation link on scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight; // Get header height once

    window.addEventListener('scroll', () => {
        let currentSectionId = ''; // To store the ID of the currently active section

        sections.forEach(section => {
            // Get the position of the section relative to the viewport top
            // Adjust by header height to activate link when section top passes header
            const sectionTop = section.offsetTop - headerHeight;
            const sectionBottom = sectionTop + section.clientHeight; // Bottom of the section

            // Check if the current scroll position is within this section
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Remove 'active' class from all links, then add to the current one
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });

        // Special handling for the 'home' section if at the very top
        if (window.scrollY === 0) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('nav a[href="#home"]').classList.add('active');
        }
    });

    // --- Set initial active link on page load if hash is present ---
    // This handles cases where the user loads the page with a direct link to a section (e.g., yourwebsite.com/#about)
    if (window.location.hash) {
        const initialTargetId = window.location.hash.substring(1);
        const initialTargetSection = document.getElementById(initialTargetId);
        if (initialTargetSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            window.scrollTo({
                top: initialTargetSection.offsetTop - headerHeight,
                behavior: 'smooth' // Smooth scroll to the initial hash
            });
            // Also set active class for the initial hash
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === window.location.hash) {
                    link.classList.add('active');
                }
            });
        }
    } else {
        // If no hash, activate the 'home' link by default when the page loads
        document.querySelector('nav a[href="#home"]').classList.add('active');
    }

    // --- Set current year in footer dynamically ---
    document.getElementById('current-year').textContent = new Date().getFullYear();
});