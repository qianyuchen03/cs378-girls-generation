import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Form, Card, Modal, ListGroup } from 'react-bootstrap';
import './SaveToBoardsScreen.css';

// Mock data for existing boards
const userBoards = [
  { id: 1, name: 'Nightlife' },
  { id: 2, name: 'Springbreak' },
  { id: 3, name: 'Nature' },
  { id: 4, name: 'City' },
  { id: 5, name: 'International' },
];

const SaveToBoardsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedImage, imageName } = location.state || {};
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [selectedBoards, setSelectedBoards] = useState([]);

  const handleBoardSelect = (boardId) => {
    setSelectedBoards(prev => 
      prev.includes(boardId)
        ? prev.filter(id => id !== boardId)
        : [...prev, boardId]
    );
  };

  const handleSave = () => {
    console.log('Saving to boards:', selectedBoards);
    navigate(-1);
  };

  const handleCreateAndSave = () => {
    console.log('Creating new board:', newBoardName);
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
      {/* Header with back button */}
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
      
      <div className="boards-checklist mb-4">
        <ListGroup>
          {userBoards.map(board => (
            <ListGroup.Item 
              key={board.id}
              action
              onClick={() => handleBoardSelect(board.id)}
              active={selectedBoards.includes(board.id)}
              className="d-flex justify-content-between align-items-center"
            >
              {board.name}
              {selectedBoards.includes(board.id) && (
                <span className="check-mark">✓</span>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <Button 
        variant="outline-secondary" 
        className="w-100 mb-3"
        onClick={() => setShowCreateModal(true)}
      >
        + Create new board
      </Button>

      <Button 
        variant="danger" 
        className="w-100"
        onClick={handleSave}
        disabled={selectedBoards.length === 0 && !newBoardName}
      >
        {selectedBoards.length > 0 ? `Save to ${selectedBoards.length} board(s)` : 'Save'}
      </Button>

      {/* Create New Board Modal */}
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