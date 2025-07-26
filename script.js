document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav ul');
    const hamburger = document.querySelector('.hamburger');

    // --- Navigation Toggle (for mobile responsiveness) ---
    if (navToggle && nav && hamburger) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close nav when a link is clicked (for smooth scrolling on mobile)
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    // --- Smooth Scrolling for Internal Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Form Submission Handling (REMOVED) ---
    // The JavaScript logic for handling form submission via fetch
    // has been removed from this file. The browser will now submit
    // the form directly to the Formspree endpoint defined in your
    // index.html file's <form action="...">.
    // Formspree will then handle the email sending and typically
    // redirect the user to a "Thank You" page.
});
