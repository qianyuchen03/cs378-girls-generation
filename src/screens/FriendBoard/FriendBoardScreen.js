import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './FriendBoardScreen.css';

const FriendBoardScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { friend, board } = state || {};

  // Single sample image
  const boardItems = [
    { 
      id: 1, 
      image: require('../../assets/board-icons/camping.jpeg'), // Update path as needed
      title: 'Beautiful Nature' 
    }
  ];

  const handleImageClick = (image) => {
    navigate('/save-to-boards', { 
      state: { 
        selectedImage: image,
        imageName: "Friend's Image" 
      } 
    });
  };

  return (
    <Container fluid className="p-0">
      {/* Header with back button and profile */}
      <div className="board-header sticky-top bg-white p-3 shadow-sm">
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-light me-3 p-2"
            onClick={() => navigate('/friends')}
          >
            ←
          </button>
          <div className="d-flex align-items-center">
            <div className="friend-avatar me-2">
              {friend?.name?.charAt(0) || 'F'}
            </div>
            <h4 className="mb-0">
              {friend?.name}'s {board?.title} Board
            </h4>
          </div>
        </div>
      </div>

      {/* Image grid */}
      <div className="pinterest-grid p-4">
        {boardItems.map(item => (
          <div 
            key={item.id} 
            className="grid-item"
            onClick={() => handleImageClick(item.image)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="img-fluid rounded shadow-sm"
              style={{ width: '100%', height: 'auto' }}
            />
            <div className="image-title mt-2">{item.title}</div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FriendBoardScreen;