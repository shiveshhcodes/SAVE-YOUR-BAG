const platformNames = ["On Amazon", "On Flipkart", "On Myntra", "On Ajio"];
        let currentIndex = 0;
        let charIndex = 0;
        let deleting = false;
        const typingSpeed = 190; // Speed of typing in milliseconds
        const deletingSpeed = 50; // Speed of deleting in milliseconds
        const pauseBetween = 1200; // Pause time after typing a word in milliseconds
        const switchInterval = 700; // Interval for switching to the next word in milliseconds
        const platformElement = document.getElementById('platform-name');
        
        // Create and style the cursor element
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


        const myModal = document.getElementById('myModal')
        const myInput = document.getElementById('myInput')
        
        myModal.addEventListener('shown.bs.modal', () => {
          myInput.focus()
        })