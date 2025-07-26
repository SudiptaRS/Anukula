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

    // --- Form Submission Handling (NEW ADDITION) ---
    const contactForm = document.querySelector('.contact-form form');
    const submitButton = contactForm ? contactForm.querySelector('.btn[type="submit"]') : null;
    let messageDiv = null; // Variable to hold the message display div

    if (contactForm && submitButton) {
        // Create a div to show messages dynamically
        messageDiv = document.createElement('div');
        messageDiv.classList.add('form-message'); // Add a class for styling
        contactForm.appendChild(messageDiv); // Append it to the form

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission (page reload)

            submitButton.disabled = true; // Disable button to prevent multiple submissions
            submitButton.textContent = 'Sending...'; // Change button text
            messageDiv.textContent = ''; // Clear any previous messages
            messageDiv.classList.remove('success', 'error'); // Remove previous styling

            const formData = new FormData(contactForm); // Get form data

            fetch(contactForm.action, { // Send data to the PHP script
                method: 'POST',
                body: formData
            })
            .then(response => {
                // Check if the network response was OK (status 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse the JSON response from PHP
            })
            .then(data => {
                // Handle the success/error response from the PHP script
                if (data.success) {
                    messageDiv.textContent = data.message;
                    messageDiv.classList.add('success');
                    contactForm.reset(); // Clear the form fields on success
                } else {
                    messageDiv.textContent = data.message;
                    messageDiv.classList.add('error');
                }
            })
            .catch(error => {
                // Catch any network errors or errors in parsing JSON
                console.error('Fetch Error:', error); // Log error for debugging
                messageDiv.textContent = 'An unexpected error occurred. Please try again later.';
                messageDiv.classList.add('error');
            })
            .finally(() => {
                // Re-enable button and reset text regardless of outcome
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
        });
    }
});