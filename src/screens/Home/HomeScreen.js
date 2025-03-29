import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';
import { Container, Row, Col } from 'react-bootstrap';

// Import all images from the assets directory except default.png
const importAll = (r) => {
  return r.keys()
    .filter(key => !key.includes('default.png'))
    .map(r);
};

const images = importAll(require.context('../../assets/board-icons', false, /\.(png|jpe?g|svg|avis)$/));

const HomeScreen = () => {
  const navigate = useNavigate();

  const handleImageClick = (image) => {
    navigate('/save-to-boards', { 
      state: { 
        selectedImage: image,
        imageName: image.split('/').pop().split('.')[0] // Extract image name
      } 
    });
  };

  return (
    <Container fluid className="p-0">
      {/* Header */}
      <div className="home-header sticky-top bg-white shadow-sm p-3">
        <h2 className="text-center mb-0">HOME</h2>
      </div>
      
      {/* Image Feed */}
      <div className="image-feed" style={{ paddingBottom: '60px' }}>
        <Row className="g-2 p-2">
          {images.map((image, index) => (
            <Col key={index} xs={6} md={4} lg={3}>
              <div 
                className="image-container"
                onClick={() => handleImageClick(image)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={image} 
                  alt={`Content ${index}`}
                  className="img-fluid rounded shadow-sm"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default HomeScreen;