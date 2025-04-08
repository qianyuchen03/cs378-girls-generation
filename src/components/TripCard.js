import React from "react";
import { Card, Button } from "react-bootstrap";
import { Heart, X } from "lucide-react";

const TripCard = ({ trip, onRemove, onOpenModal }) => {
  return (
    <div className="trip-card" onClick={() => onOpenModal(trip)}>
      <img src={trip.imageUrl} alt={trip.city} className="trip-image" />
      <div className="trip-details">
      <div className="card-title">
        <h3>{trip.city}</h3>
      </div>
      <div className="card-text">
        <p>{trip.country} • {trip.price}</p>
      </div>
        <div className="tags">
          {trip.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      <Button className="check trip-heart-btn" onClick={(e) => { e.stopPropagation(); onRemove(trip.id); }}>
            <Heart strokeWidth={4}/>
      </Button>
    </div>
    </div>
  );
};

export default TripCard;