import React from "react";

const TripCard = ({ trip, onRemove, onOpenModal }) => {
  return (
    <div className="trip-card" onClick={() => onOpenModal(trip)}>
      <img src={trip.imageUrl} alt={trip.city} className="trip-image" />
      <div className="trip-details">
        <h3>{trip.city}</h3>
        <p>{trip.country} • {trip.price}</p>
        <div className="tags">
          {trip.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      <button className="heart-button" onClick={(e) => { e.stopPropagation(); onRemove(trip.id); }}>
        ♥
      </button>
    </div>
  );
};

export default TripCard;