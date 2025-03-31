import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Check, X } from "lucide-react";
import "./RecommendationsScreen.css";
import RecommendationsCard from "../../components/RecommendationCard";
import tripsData from '../../data/tripsData'; // Assuming tripsData is an array of objects
import TripModal from '../../components/TripModal';

const RecommendationsScreen = () => {
  const recommendationTrips = tripsData.filter(trip => !trip.saved);
  const [trips, setTrips] = useState(recommendationTrips);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clickedTripInfo, setClickedTripInfo] = useState(null);

  const currentTrip = trips[currentIndex];

  const handleCheck = () => {
    const updatedTrips = [...trips];
    updatedTrips[currentIndex].saved = true;
    setTrips(updatedTrips);
    setCurrentIndex(prev => prev + 1);
  };

  const handleSkip = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleOpenModal = (trip) => {
    setClickedTripInfo(trip);
  };

  const closeModal = () => {
    setClickedTripInfo(null);
  };

  if (currentIndex >= trips.length) {
    return (
      <div className="screen">
        <h2>Recommendations</h2>
        <Card>
          <Card.Title>No more items</Card.Title>
        </Card>
      </div>
    );
  }

  return (
    <div className="screen">
      <h2>Recommendations</h2>
      <RecommendationsCard trip={currentTrip} onOpenModal={handleOpenModal} />
      <div className="buttons">
        <Button className="skip rec-btn" onClick={handleSkip}>
          <X />
        </Button>
        <Button className="check rec-btn" onClick={handleCheck}>
          <Check />
        </Button>
      </div>
      {clickedTripInfo && <TripModal trip={clickedTripInfo} onClose={closeModal} />}
    </div>
  );
};

export default RecommendationsScreen;
