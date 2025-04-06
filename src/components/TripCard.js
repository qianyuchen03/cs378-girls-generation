import React from "react";
import Card from 'react-bootstrap/Card';

const TripCard = ({ trip, onRemove, onOpenModal }) => {
  return (
    <Card className="recommendation-card" onClick={() => onOpenModal(trip)}>
      <Card.Img
        variant="top"
        src={`${trip.imageUrl}`}
        alt={trip.city}
        className="card-img-top"
        style={{ height: "40vh", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="card-title">{trip.city}</Card.Title>
        <Card.Text className="card-text">{trip.country} • {trip.price}</Card.Text>
        <div className="tags">
          {trip.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        <button
          className="heart-button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(trip.id);
          }}
        >
          {trip.saved ? '❤️' : '🤍'}
        </button>
      </Card.Body>
    </Card>
  );

};

export default TripCard;