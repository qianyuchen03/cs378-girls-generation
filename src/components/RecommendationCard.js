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
                        <Card.Img
                            src={trip.imageUrl}
                            alt={trip.city}
                            style={{
                                width: "100%",
                                height: "40vh",
                                objectFit: "cover",
                                borderRadius: "0.5rem",
                                marginBottom: "1rem"
                            }}
                        />
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