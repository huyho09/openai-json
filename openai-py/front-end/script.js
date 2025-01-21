class Chatbot {
    constructor(chatBox, userInput, sendBtn, saveBtn) {
        this.chatBox = document.querySelector(chatBox);
        this.userInput = document.getElementById(userInput);
        this.sendBtn = document.getElementById(sendBtn);
        this.saveBtn = document.getElementById(saveBtn);
        this.currentMessage = '';

        this.initialize();
    }

    // Initialize event listeners
    initialize() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.saveBtn.addEventListener('click', () => this.saveEditedResponse());
    }

    // Append a message to the chat box
    appendMessage(sender, message) {
        this.chatBox.innerHTML += `<div><strong>${sender}:</strong> ${message}</div>`;
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }

    // Send message to the backend
    sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Append user message
        this.appendMessage('You', message);
        this.userInput.value = '';

        fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
            credentials: 'same-origin'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const botResponse = data.response;

            // Append bot response with edit button
            this.appendMessage('Bot', `${botResponse} <button class="btn btn-sm btn-link edit-btn">Edit</button>`);

            // Add event listener for edit buttons
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.currentMessage = message;
                    document.getElementById('edit-response').value = botResponse;
                    new bootstrap.Modal(document.getElementById('editModal')).show();
                });
            });

            this.chatBox.scrollTop = this.chatBox.scrollHeight;
        })
        .catch(error => console.error('Error:', error));
    }

    // Save edited response to data.json
    saveEditedResponse() {
        const updatedResponse = document.getElementById('edit-response').value.trim();
        if (!updatedResponse) return;

        fetch('http://127.0.0.1:5000/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: this.currentMessage, response: updatedResponse }),
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);

            // Update the chat box with the new response
            this.appendMessage('Updated Bot', updatedResponse);

            this.chatBox.scrollTop = this.chatBox.scrollHeight;
        })
        .catch(error => console.error('Error:', error));
    }
}

// Init the Chatbot class
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot('.chat-box', 'user-input', 'send-btn', 'save-btn');
});
