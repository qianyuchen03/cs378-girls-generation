// screens/FriendBoard/FriendBoardScreen.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FriendBoardScreen.css';

const FriendBoardScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { friend, board } = state || {};

  // Sample board items
  const boardItems = [
    { id: 1, image: 'image1.jpg', title: 'Beach Vacation' },
    { id: 2, image: 'image2.jpg', title: 'Mountain Hike' },
    // ... more items
  ];

  return (
    <div className="board-screen">
      {/* Header with back button and profile */}
      <div className="board-header">
        <button 
          className="back-button"
          onClick={() => navigate('/friends')}
        >
          ← 
        </button>
        
        <div className="board-profile">
          <div className="friend-avatar">{friend?.avatar}</div>
          <h3>{friend?.name}'s {board?.title} Board</h3>
        </div>
      </div>

      {/* Pinterest-style grid */}
      <div className="pinterest-grid">
        {boardItems.map(item => (
          <div key={item.id} className="grid-item">
            <img 
              src={item.image} 
              alt={item.title} 
              className="grid-image"
            />
            <div className="image-title">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendBoardScreen;