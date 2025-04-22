import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Heart, X } from "lucide-react";
import "./RecommendationsScreen.css";
import RecommendationsCard from "../../components/RecommendationCard";
import { getUnsavedTrips, saveTrip, getRecommendedTrips } from '../../services/tripService';
import TripModal from '../../components/TripModal';
import { getMostFrequentTags } from '../../utils/tagUtils'; // Create this file if it doesn't exist

const RecommendationsScreen = ({ userBoards }) => {  // Receive userBoards as prop
  const [trips, setTrips] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clickedTripInfo, setClickedTripInfo] = useState(null);

  // Extract tags from user's saved boards
  const getUserTags = () => {
    if (!userBoards) return [];
    
    const allTags = [];
    userBoards.forEach(board => {
      if (board.images) {  // Add null check
        board.images.forEach(image => {
          if (image.tags) {  // Add null check
            allTags.push(...image.tags);
          }
        });
      }
    });
      // DEBUG: See raw tags before processing
  console.log('All collected tags:', allTags);

  const frequentTags = getMostFrequentTags(allTags);
  
  // DEBUG: See processed tags
  console.log('Most frequent tags:', frequentTags);
  
  return frequentTags;

  };

  useEffect(() => {
    const fetchRecommendedTrips = async () => {
      console.log("Current userBoards:", JSON.stringify(userBoards, null, 2));
      const userTags = getUserTags();
      
      // DEBUG: See final tags being used for recommendations
      console.log('Tags being used for recommendations:', userTags);
      
      const trips = await getRecommendedTrips(userTags);
      
      console.log('Recommended trips:', trips); // Optional: see results
      setTrips(trips);
    };
    fetchRecommendedTrips();
  }, [userBoards]);

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
        <RecommendationsCard key={currentTrip?.documentID} trip={currentTrip} />
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
