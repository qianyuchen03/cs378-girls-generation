import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Heart, X } from "lucide-react";
import "./RecommendationsScreen.css";
import RecommendationsCard from "../../components/RecommendationCard";
import { getUnsavedTrips, saveTrip } from '../../services/tripService';
import TripModal from '../../components/TripModal';

const RecommendationsScreen = () => {
  const [trips, setTrips] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clickedTripInfo, setClickedTripInfo] = useState(null);

  useEffect(() => {
    const fetchUnsavedTrips = async () => {
      const trips = await getUnsavedTrips();
      setTrips(trips);
    };
    fetchUnsavedTrips();
  }, []);

  const currentTrip = trips[currentIndex];

  const handleCheck = async () => {
    if (!currentTrip?.documentID) return;
    await saveTrip(currentTrip.documentID);
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
      <div>
        <div className="recommendations-header">
          <h2>Recommendations</h2>
        </div>
        <div className="recommendations-screen">
          <h3 style={{ color: "black" }} >No more recommendations</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="recommendations-header">
        <h2>Recommendations</h2>
      </div>
      <div className="recommendations-screen">
        <RecommendationsCard trip={currentTrip} onOpenModal={handleOpenModal} />
        <div className="buttons">
          <Button className="skip rec-btn" onClick={handleSkip}>
            <X strokeWidth={4}/>
          </Button>
          <Button className="check rec-btn" onClick={handleCheck}>
            <Heart strokeWidth={4}/>
          </Button>
        </div>
        {clickedTripInfo && <TripModal trip={clickedTripInfo} onClose={closeModal} />}
      </div>
    </>
  );
};

export default RecommendationsScreen;
