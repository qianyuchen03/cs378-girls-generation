import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';
import { getAllPics } from '../../services/homeService';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageLinks = await getAllPics();
        setImages(imageLinks);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

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
      <div className="home-header sticky-top bg-white shadow-sm p-3">
        <h2 className="text-center mb-0">HOME</h2>
      </div>

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