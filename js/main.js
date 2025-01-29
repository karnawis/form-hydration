const form = document.getElementById('entryForm');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Listen for form submission
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get the form values
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Retrieve existing entries from local storage
            const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];

            // Check if the email already exists
            const existingEntryIndex = savedEntries.findIndex(entry => entry.email === email);

            if (existingEntryIndex !== -1) {
                // Update the existing entry
                savedEntries[existingEntryIndex].message = message;
            } else {
                // Create a new entry with a unique ID
                const id = 'entry-' + Date.now();
                savedEntries.push({ id, email, message });
            }

            // Save the updated entries back to local storage
            localStorage.setItem('entries', JSON.stringify(savedEntries));

            // Refresh the entries list
            displayEntries();

            // Clear the form
            form.reset();
        });

        // Listen for changes to the email input
        emailInput.addEventListener('input', function () {
            const email = emailInput.value.trim();
            const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];

            // Find an entry with the matching email
            const matchingEntry = savedEntries.find(entry => entry.email === email);

            if (matchingEntry) {
                // Rehydrate the form with the matching entry's data
                messageInput.value = matchingEntry.message;
            } else {
                // Clear the other fields if no match is found
                messageInput.value = '';
            }
        });

        // Function to display entries in the list
        function displayEntries() {
            const entriesList = document.getElementById('entriesList');
            const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];

            // Clear the existing list
            entriesList.innerHTML = '';

            // Populate the list with saved entries
            savedEntries.forEach(entry => {
                const listItem = document.createElement('li');
                listItem.textContent = `ID: ${entry.id}, Email: ${entry.email}, Message: ${entry.message}`;
                entriesList.appendChild(listItem);
            });
        }

        // Display entries on page load
        displayEntries();