// app.js

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved user theme, if any, on load
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
    }

    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        let theme = 'light';
        if (body.classList.contains('dark-mode')) {
            theme = 'dark';
        }
        // Save the user preference in localStorage
        localStorage.setItem('theme', theme);
    });

    // Typing effect functionality
    const platformNames = ["Amazon", "Flipkart", "Myntra", "Meesho"];
    let currentIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const typingSpeed = 150; // Speed of typing in milliseconds
    const deletingSpeed = 100; // Speed of deleting in milliseconds
    const pauseBetween = 2000; // Pause time after typing a word in milliseconds
    const switchInterval = 3000; // Interval for switching to the next word in milliseconds
    const platformElement = document.getElementById('platform-name');
    const cursorElement = document.createElement('span'); // Create a cursor element
    cursorElement.className = 'blinking-cursor';
    platformElement.appendChild(cursorElement); // Add cursor to the platform name element

    function type() {
        if (!deleting && charIndex <= platformNames[currentIndex].length) {
            platformElement.textContent = platformNames[currentIndex].slice(0, charIndex++);
            platformElement.appendChild(cursorElement); // Append cursor after text
            setTimeout(type, typingSpeed);
        } else if (deleting && charIndex > 0) {
            platformElement.textContent = platformNames[currentIndex].slice(0, --charIndex);
            platformElement.appendChild(cursorElement); // Append cursor after text
            setTimeout(type, deletingSpeed);
        } else {
            if (!deleting) {
                setTimeout(() => {
                    deleting = true;
                    setTimeout(type, deletingSpeed); // Start deleting after a pause
                }, pauseBetween);
            } else {
                deleting = false;
                charIndex = 0;
                currentIndex = (currentIndex + 1) % platformNames.length;
                setTimeout(type, switchInterval); // Switch to the next word after deleting
            }
        }
    }

    type();
});
