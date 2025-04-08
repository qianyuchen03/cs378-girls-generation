import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

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
        imageName: image.split('/').pop().split('.')[0]
      } 
    });
  };

  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header sticky-top bg-white shadow-sm p-3">
        <h2 className="text-center mb-0">HOME</h2>
      </div>
      
      {/* Image Feed */}
      <div className="image-feed">
        {images.map((image, index) => (
          <div 
            key={index}
            className="image-container"
            onClick={() => handleImageClick(image)}
          >
            <img 
              src={image} 
              alt={`Content ${index}`}
              className="image-item"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;