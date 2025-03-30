import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Check, X } from "lucide-react";
import "./RecommendationsScreen.css";
import RecommendationsCard from "../../components/RecommendationCard";
import tripsData from '../../data/tripsData';
import TripModal from '../../components/TripModal';

const RecommendationsScreen = () => {
  const recommendationTrips = tripsData.filter(trip => !trip.saved);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clickedTripInfo, setClickedTripInfo] = useState(null);

  const handleCheck = () => {
    recommendationTrips[currentIndex].saved = true;
    setCurrentIndex((prev) => prev + 1);
  }

  const handleSkip = () => {
    setCurrentIndex((prev) => prev + 1);
  }

  const handleOpenModal = (trip) => {
    setClickedTripInfo(trip);
  };

  const closeModal = () => {
    setClickedTripInfo(null);
  };

  if (currentIndex >= recommendationTrips.length) {
    return (
      <div className="screen">
        <h2>Recommendations</h2>
        <Card>
          <Card.Title>No more items</Card.Title>
        </Card>
      </div>
    )
  }

  const currentTrip = recommendationTrips[currentIndex];

  return (
    <div className="screen">
      <h2>Recommendations</h2>
      <RecommendationsCard trip={currentTrip} onOpenModal={handleOpenModal} />
      <div className="buttons">
        <Button className="skip" onClick={handleSkip}>
          <X />
        </Button>
        <Button className="check" onClick={handleCheck}>
          <Check />
        </Button>
      </div>
      {clickedTripInfo && <TripModal trip={clickedTripInfo} onClose={closeModal} />}
    </div>
  );
};

export default RecommendationsScreen;
