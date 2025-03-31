import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import './UserBoardScreen.css';

const UserBoardScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { board } = state || {};

  // Safely get images array with default empty array
  const boardImages = board?.images || [];

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center mb-4">
        <Button 
          variant="light" 
          onClick={() => navigate(-1)}
          className="me-3 p-2"
          aria-label="Go back"
        >
          <span aria-hidden="true">&larr;</span>
        </Button>
        <h2 className="mb-0">{board?.name || 'Untitled Board'}</h2>
      </div>

      <div className="board-images-grid">
        {boardImages.length > 0 ? (
          boardImages.map((image, index) => (
            <div key={index} className="board-image-item">
              <img 
                src={image} 
                alt={`Board content ${index}`}
                className="img-fluid rounded shadow-sm"
              />
            </div>
          ))
        ) : (
          <div className="empty-board-message">
            <p>This board is empty. Save images to see them here!</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default UserBoardScreen;