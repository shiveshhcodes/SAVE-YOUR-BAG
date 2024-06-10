// app.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const urlInput = document.getElementById('product-url');
    const submitButton = document.getElementById('submit-button');
    const loadingSpinner = document.getElementById('loading-spinner');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Basic URL validation
        if (!urlInput.value || !isValidURL(urlInput.value)) {
            showMessage('Please enter a valid product link.', 'error');
            return;
        }

        // Show loading spinner and disable the submit button
        submitButton.disabled = true;
        loadingSpinner.classList.remove('hidden');

        // Simulate a network request (replace with actual request in production)
        setTimeout(() => {
            // Hide the spinner and enable the submit button
            loadingSpinner.classList.add('hidden');
            submitButton.disabled = false;

            // Clear the input field
            urlInput.value = '';

            // Show a success message
            showMessage('Product link has been successfully submitted!', 'success');
        }, 2000); // Simulated delay
    });

    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.classList.remove('hidden');

        // Hide the message after 3 seconds
        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 3000);
    }
});
