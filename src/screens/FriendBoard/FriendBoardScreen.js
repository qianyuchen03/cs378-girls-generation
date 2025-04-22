import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { fetchFriendBoardImages } from '../../services/friendsService';
import './FriendBoardScreen.css';

const FriendBoardScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { friend, board } = state || {};
  const [boardItems, setBoardItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBoardImages = async () => {
      try {
        if (!friend || !board) return;
        
        const images = await fetchFriendBoardImages(friend.id, board.id);
        setBoardItems(images);
      } catch (error) {
        console.error('Error loading board images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBoardImages();
  }, [friend, board]);

  const handleImageClick = (image) => {
  
    navigate('/save-to-boards', { 
      state: { 
        selectedImage: {
          url: image.imageURL,          // Using imageURL from the image object
          tags: [],                     // Default empty array if no tags exist
          id: image.id || Date.now()    // Use existing ID or generate a temporary one
        },}
    });
  };

  if (loading) {
    return (
      <Container fluid className="p-0">
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
        <div className="text-center p-5">Loading...</div>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0">
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

      {boardItems.length > 0 ? (
        <div className="pinterest-grid p-4">
          {boardItems.map(item => (
            <div 
              key={item.id} 
              className="grid-item"
              onClick={() => handleImageClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={item.imageURL} 
                alt={item.title} 
                className="img-fluid rounded shadow-sm"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-5">No images found in this board</div>
      )}
    </Container>
  );
};

export default FriendBoardScreen;