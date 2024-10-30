import { useState } from "react";
import PropTypes from "prop-types";


const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message); 
      setMessage("");
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

MessageInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default MessageInput;
