import React, { useState } from 'react';
import TripCard from '../../components/TripCard';
import tripsData from '../../data/tripsData';
import TripModal from '../../components/TripModal';
// import './SavedBoard.css'
import '../Recommendations/RecommendationsScreen.css'

const SavedScreen = () => {
    const [savedTrips, setSavedTrips] = useState(tripsData.filter(trip => trip.saved));
  const [selectedTrip, setSelectedTrip] = useState(null);

  const handleToggleSave = (id) => {
    const updatedTrips = savedTrips.map(trip =>
      trip.id === id ? { ...trip, saved: !trip.saved } : trip
    );
    setSavedTrips(updatedTrips.filter(trip => trip.saved));
  };

  const handleOpenModal = (trip) => {
    setSelectedTrip(trip);
  };

  const closeModal = () => {
    setSelectedTrip(null);
  };

  return (
    <>
      <div className="recommendations-header">
      <h2>Saved Trips</h2>
      </div>
    <div className="recommendations-screen">
      <div className="trips-container">
        {savedTrips.length > 0 ? (
          savedTrips.map(trip => (
            <TripCard 
              key={trip.id}
              trip={trip}
              onRemove={handleToggleSave}
              onOpenModal={handleOpenModal}
            />
          ))
        ) : (
          <p>No saved trips available.</p>
        )}
      </div>
      {selectedTrip && <TripModal trip={selectedTrip} onClose={closeModal} />}
    </div>
    </>
  );
}

export default SavedScreen;