import { useState, useEffect } from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";
import MessageInput from "./MessageInput"; // Import MessageInput


const socket = io("http://localhost:5000");

const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    if (message.trim()) {
      socket.emit("send_message", { username, message });
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.username === username ? "message my-message" : "message"}
          >
            <strong>{msg.username}: </strong>{msg.message}
          </div>
        ))}
      </div>
      <MessageInput sendMessage={sendMessage} /> {/* Pass sendMessage as a prop */}
    </div>
  );
};

Chat.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Chat;
