import React from 'react';
import '../screens/SavedBoard/SavedBoard.css'

const TripModal = ({ trip, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{trip.city}, {trip.country}</h2>
        <p>Price: {trip.price}</p>
        <h4>Activities:</h4>
        <ul>
          {trip.activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
        <h4>Hotels:</h4>
        <ul>
          {trip.hotels.map((hotel, index) => (
            <li key={index}>{hotel}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TripModal;