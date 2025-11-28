import React, { useState, useEffect } from "react";
import { FaBell, FaFlag } from "react-icons/fa";
import styles from "../../../styles/SocialInbox/UrgentAlerts.module.css";

const UrgentAlerts = ({ selectedPlatform }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [messagesList, setMessagesList] = useState([]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newUserMessage = {
      id: Date.now(),
      name: 'User',
      avatar: '/images/user-avatar.png',
      message: newMessage,
      aiResponse: false,
      priority: 'medium'
    };

    const aiResponse = {
      id: Date.now() + 1,
      name: 'Gen AI',
      avatar: '/images/ai-avatar.png',
      message: `New message received: ${newMessage}`,
      aiResponse: true,
      priority: 'medium'
    };

    setMessagesList(prev => [...prev, newUserMessage, aiResponse]);
    setNewMessage('');
  };

  const generateAiSuggestions = (messageContent) => {
    const suggestions = [
      { id: 1, content: `AI Response 1 for: ${messageContent}`, confidence: 0.9 },
      { id: 2, content: `AI Response 2 for: ${messageContent}`, confidence: 0.8 }
    ];
    setAiSuggestions(suggestions);
  };

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: "Cameron Williamson",
        avatar: "/images/user-avatar.png",
        message: "Your product service is not working properly. Need immediate assistance!",
        platform: "Twitter",
        isAI: false,
        priority: "high",
      },
      {
        id: 2,
        name: "Gen AI",
        avatar: "/images/ai-avatar.png",
        message: "I understand your concern about the service issues. Our technical team has been notified and will resolve this within the next hour.",
        platform: "Twitter",
        isAI: true,
        priority: "high",
      },
      {
        id: 3,
        name: "Sarah Parker",
        avatar: "/images/user-avatar.png",
        message: "Love the new features you've added! Quick question about pricing.",
        platform: "LinkedIn",
        isAI: false,
        priority: "medium",
      },
      {
        id: 4,
        name: "Gen AI",
        avatar: "/images/ai-avatar.png",
        message: "Thank you for your positive feedback! I'd be happy to explain our pricing structure.",
        platform: "LinkedIn",
        isAI: true,
        priority: "medium",
      },
      {
        id: 5,
        name: "Mike Johnson",
        avatar: "/images/user-avatar.png",
        message: "Interested in enterprise solutions. When can we schedule a demo?",
        platform: "Facebook",
        isAI: false,
        priority: "high",
      },
      {
        id: 6,
        name: "Gen AI",
        avatar: "/images/ai-avatar.png",
        message: "Great to hear your interest in our enterprise solutions! I can help schedule a demo right away.",
        platform: "Facebook",
        isAI: true,
        priority: "high",
      },
      {
        id: 7,
        name: "Emma Wilson",
        avatar: "/images/user-avatar.png",
        message: "Your latest product photos are amazing! Can you ship internationally?",
        platform: "Instagram",
        isAI: false,
        priority: "medium",
      },
      {
        id: 8,
        name: "Gen AI",
        avatar: "/images/ai-avatar.png",
        message: "Yes, we offer worldwide shipping! Let me provide you with our international shipping rates and policies.",
        platform: "Instagram",
        isAI: true,
        priority: "medium",
      },
      {
        id: 9,
        name: "David Chen",
        avatar: "/images/user-avatar.png",
        message: "The tutorial video was super helpful! But I have a question about the advanced features.",
        platform: "YouTube",
        isAI: false,
        priority: "low",
      },
      {
        id: 10,
        name: "Gen AI",
        avatar: "/images/ai-avatar.png",
        message: "I'm glad you found the tutorial helpful! Let me explain the advanced features in detail.",
        platform: "YouTube",
        isAI: true,
        priority: "low",
      }
    ];

    const filteredMessages = selectedPlatform === 'all' 
      ? mockData 
      : mockData.filter(msg => msg.platform === selectedPlatform);
    
    setMessages(filteredMessages);
    setMessagesList(filteredMessages);
  }, [selectedPlatform]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "#ff4444";
      case "medium": return "#00C851";
      case "low": return "#ffbb33";
      default: return "#757575";
    }
  };

  const handleFlagClick = (messageId) => {
    setMessagesList(prevMessages =>
      prevMessages.map(msg => {
        if (msg.id === messageId) {
          const priorities = ['high', 'medium', 'low', null];
          const currentIndex = priorities.indexOf(msg.priority);
          const nextIndex = (currentIndex + 1) % priorities.length;
          return { ...msg, priority: priorities[nextIndex] };
        }
        return msg;
      })
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <FaBell className={styles.bellIcon} />
        <h2 className={styles.heading}>Urgent Alerts - {selectedPlatform}</h2>
      </div>

      <div className={styles.messagesList}>
        {messages.map((msg) => (
          <div key={msg.id} className={styles.messageContainer}>
            <div className={styles.avatarLineContainer}>
              <div className={`${styles.avatarWrapper} ${msg.isAI ? styles.aiAvatar : styles.userAvatar}`}>
                <img src={msg.avatar} alt={msg.name} className={styles.avatarImage} />
              </div>
              {!msg.isAI && (
                <div className={styles.connectionLines}>
                  <div className={styles.verticalLine}></div>
                  <div className={styles.curvedLine}></div>
                </div>
              )}
            </div>

            <div className={`${styles.messageGroup} ${msg.isAI ? styles.aiMessage : styles.userMessage}`}>
              <div className={styles.messageBox}>
                <div className={styles.messageHeader}>
                  <span className={styles.name}>{msg.name}</span>
                  <span className={styles.platform}>{msg.platform}</span>
                  <FaFlag 
                    className={styles.flagIcon} 
                    style={{ color: getPriorityColor(msg.priority) }}
                    onClick={() => handleFlagClick(msg.id)}
                  />
                </div>
                <p className={styles.messageText}>{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            generateAiSuggestions(e.target.value);
          }}
          className={styles.inputBox}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
      </div>
    </div>
  );
};

export default UrgentAlerts;
