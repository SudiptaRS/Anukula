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

    // --- Form Submission Handling: REMOVED ---
    // The previous JavaScript logic that intercepted form submissions and
    // attempted to display messages on the page using fetch API has been
    // removed. This is because Formspree, in its default setup for direct
    // form submissions, performs a page redirect rather than sending
    // a JSON response back to the client-side JavaScript.
    // By removing this code, the browser will now handle the form submission
    // directly to Formspree, and Formspree will manage the post-submission
    // experience (typically a redirect to a thank-you page).
});
