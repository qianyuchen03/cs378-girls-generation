import React from "react";
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const RecommendationsCard = ({ trip }) => {
    return (
        <Card className="recommendation-card">
            <Card.Body>
                <Tabs defaultActiveKey="overview" className="mb-3" fill>
                    <Tab eventKey="overview" title="Overview">
                        <div className="trip-gallery">
                            {trip.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Trip image ${index + 1}`}
                                className="gallery-image"
                                style={{
                                    width: "90%",
                                    height: "40vh",
                                    borderRadius: "0.5rem",
                                }}
                            />
                            ))}
                        </div>
                        <Card.Title>{trip.city}</Card.Title>
                        <Card.Text>{trip.country} • {trip.price}</Card.Text>

                        <div className="tags mb-3">
                            {trip.tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>
                    </Tab>
                    <Tab eventKey="activities" title="Activities">
                        <ul>
                            {trip.activities?.map((activity, index) => (
                                <li key={index}>{activity}</li>
                            ))}
                        </ul>
                    </Tab>
                    <Tab eventKey="restaurants" title="Restaurants">
                        <ul>
                            {trip.restaurants?.map((restaurant, index) => (
                                <li key={index}>{restaurant}</li>
                            ))}
                        </ul>
                    </Tab>
                    <Tab eventKey="hotels" title="Hotels">
                        <ul>
                            {trip.hotels?.map((hotel, index) => (
                                <li key={index}>{hotel}</li>
                            ))}
                        </ul>
                    </Tab>
                </Tabs>
            </Card.Body>
        </Card>
    );
};

export default RecommendationsCard;