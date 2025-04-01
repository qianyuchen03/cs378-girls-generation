import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { boardItems } from '../../data/boardsData';
import './UserBoardScreen.css';

const UserBoardScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { board } = state || {};
  const [items, setItems] = useState(boardItems[board.title] || []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleDeleteClick = (itemId) => {
    setSelectedItemId(itemId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== selectedItemId));
    setShowDeleteModal(false);
    setSelectedItemId(null);
  };

  return (
    <div className="board-screen">
      {/* Header with back button */}
      <div className="board-header">
        <button className="back-button" onClick={() => navigate('/')}>←</button>
        <h3>Your {board?.title} Board</h3>
      </div>

      {/* Pinterest-style grid */}
      <div className="pinterest-grid">
        {items.map(item => (
          <div key={item.id} className="grid-item">
            <img src={item.image} alt={item.title} className="grid-image" />
            <div className="image-title">{item.title}</div>
            <button className="delete-button" onClick={() => handleDeleteClick(item.id)}>🗑</button>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowDeleteModal(false)}>×</button>
            <p>Are you sure you want to delete?</p>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            <button onClick={confirmDelete}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBoardScreen;
