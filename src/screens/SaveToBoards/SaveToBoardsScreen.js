import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Form, Card, Modal, ListGroup } from 'react-bootstrap';
import './SaveToBoardsScreen.css';

const SaveToBoardsScreen = ({ userBoards, setUserBoards }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedImage } = location.state || {};
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [selectedBoards, setSelectedBoards] = useState([]);

  // Safely handle undefined props with defaults
  const safeUserBoards = Array.isArray(userBoards) ? userBoards : [];
  const safeSetUserBoards = setUserBoards || (() => console.warn('setUserBoards not provided'));

  const handleBoardSelect = (boardId) => {
    setSelectedBoards(prev => 
      prev.includes(boardId)
        ? prev.filter(id => id !== boardId)
        : [...prev, boardId]
    );
  };

  const handleSave = () => {
    const updatedBoards = safeUserBoards.map(board => {
      if (selectedBoards.includes(board.id)) {
        return {
          ...board,
          // Ensure images array exists before spreading
          images: [...(board.images || []), selectedImage]
        };
      }
      return board;
    });
    
    safeSetUserBoards(updatedBoards);
    navigate(-1);
  };

  const handleCreateAndSave = () => {
    const newBoard = {
      id: Date.now(),
      name: newBoardName,
      images: [selectedImage]
    };
    
    safeSetUserBoards([...safeUserBoards, newBoard]);
    setShowCreateModal(false);
    navigate(-1);
  };

  if (!selectedImage) {
    return (
      <Container className="text-center py-5">
        <h3>No image selected</h3>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </Container>
    );
  }

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
        <h2 className="mb-0">Save to Boards</h2>
      </div>
      
      <Card className="mb-4">
        <Card.Img variant="top" src={selectedImage} />
      </Card>

      <h4 className="mb-3">Select Boards</h4>
      
      <div className="boards-checklist mb-3">
        <ListGroup>
          {safeUserBoards.length > 0 ? (
            safeUserBoards.map(board => (
              <ListGroup.Item 
                key={board.id}
                action
                onClick={() => handleBoardSelect(board.id)}
                className="d-flex align-items-center ps-3"
              >
                <div className={`check-circle ${selectedBoards.includes(board.id) ? 'checked' : ''}`}>
                  {selectedBoards.includes(board.id) && (
                    <span className="check-icon">✓</span>
                  )}
                </div>
                <span className="ms-3">{board.name}</span>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>
              No boards available. Create one first.
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>

      <div className="button-group">
        <Button 
          variant="outline-secondary" 
          className="w-100 mb-2"
          onClick={() => setShowCreateModal(true)}
        >
          + Create new board
        </Button>

        <Button 
          variant="primary" 
          className="w-100 mt-0 save-button"
          onClick={handleSave}
          disabled={selectedBoards.length === 0 && !newBoardName}
        >
          {selectedBoards.length > 0 ? `Save to ${selectedBoards.length} board(s)` : 'Save'}
        </Button>
      </div>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create new board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="boardName">
            <Form.Label>Board name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. 'Summer Vacation Ideas'"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleCreateAndSave}
            disabled={!newBoardName.trim()}
          >
            Create & Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SaveToBoardsScreen;