import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, fetchChatHistory } from '../redux/chatReducer';
import '../assets/styles/main.css';

const ChatInterface = () => {
  const dispatch = useDispatch();
  const chatHistory = useSelector((state) => state.chat.chatHistory);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchChatHistory());
  }, [dispatch]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      dispatch(sendMessage(message));
      setMessage('');
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-history">
        {chatHistory.map((chatMessage, index) => (
          <div key={index} className="chat-message">
            <span className={chatMessage.isAI ? 'ai-message' : 'user-message'}>
              {chatMessage.text}
            </span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;