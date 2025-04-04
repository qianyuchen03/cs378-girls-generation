import React from "react";
import Card from 'react-bootstrap/Card';

const RecommendationsCard = ({ trip, onOpenModal }) => {
    return (
        <Card className="recommendation-card" onClick={() => onOpenModal(trip)}>
            <Card.Img
            variant="top"
            src={trip.imageUrl}
            alt={trip.city}
            style={{ height: "40vh", objectFit: "cover" }}
            />
            <Card.Body>
                <Card.Title>{trip.city}</Card.Title>
                <Card.Text>{trip.country} • {trip.price}</Card.Text>
                <div className="tags">
                    {trip.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
            </Card.Body>
        </Card>
    )
}

export default RecommendationsCard;