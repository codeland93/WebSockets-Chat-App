// src/client.js
import { io } from "socket.io-client"; // Importing io from socket.io-client

// Establish a connection to the WebSocket server
const socket = io("http://localhost:5000");

// Log when connected to the WebSocket server
socket.on("connect", () => {
    console.log("Connected to WebSocket server");
});

// Listen for incoming messages
socket.on("receive_message", (data) => {
    console.log("Message received:", data);
    displayMessage(data.message, data.username); // Display the message in the chat interface
});

// Function to send a message
const sendMessage = (message, username) => {
    socket.emit("send_message", { message, username }); // Emit the message along with the username
};

// Display a message in the chat
const displayMessage = (message, username) => {
    const chatContainer = document.getElementById("chat-container");
    const messageElement = document.createElement("div");
    
    messageElement.textContent = `${username}: ${message}`;
    chatContainer.appendChild(messageElement); // Append the new message to the chat container
};

// Example function to send a message (hook this to a button click)
const attachSendButtonListener = () => {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    const usernameInput = document.getElementById('username'); // Assuming you have an input for the username

    sendButton.onclick = function() {
        const message = messageInput.value;

        if (message.trim()) {
            const username = usernameInput.value; // Get the username from the input field
            sendMessage(message, username); // Send the message with the username
            messageInput.value = ''; // Clear the input field after sending
        }
    };
};

// Initialize the send button listener on page load
window.onload = () => {
    attachSendButtonListener(); // Set up the event listener for the send button
};

export { sendMessage }; // Export sendMessage if needed in other modules
