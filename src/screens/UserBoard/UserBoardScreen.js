import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Modal} from 'react-bootstrap';
import './UserBoardScreen.css';

const UserBoardScreen = ({ userBoards = [], setUserBoards }) => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  // Find the current board safely
  const board = userBoards.find(b => b.id === Number(boardId)) || {
    name: 'Untitled Board',
    images: []
  };

  const handleDeleteClick = (image) => {
    setImageToDelete(image);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Update local state
    const updatedBoards = userBoards.map(b => {
      if (b.id === Number(boardId)) {
        return {
          ...b,
          images: b.images.filter(img => img !== imageToDelete)
        };
      }
      return b;
    });

    setUserBoards(updatedBoards);
    setShowDeleteModal(false);
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
                src={image.url} 
                alt={`Board content ${index}`}
                className="img-fluid rounded shadow-sm"
              />
              <Button
                variant="danger"
                size="sm"
                className="delete-btn"
                onClick={() => handleDeleteClick(image)}
              >
                ×
              </Button>
            </div>
          ))
        ) : (
          <div className="empty-board-message">
            <p>This board is empty. Save images to see them here!</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this image from your board?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserBoardScreen;