import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import './UserBoardScreen.css';

const UserBoardScreen = ({ userBoards = [] }) => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  // Find the current board safely
  const board = userBoards.find(b => b.id === Number(boardId)) || {
    name: 'Untitled Board',
    images: []
  };

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
        <h2 className="mb-0">{board.name}</h2>
      </div>

      <div className="board-images-grid">
        {board.images.length > 0 ? (
          board.images.map((image, index) => (
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
