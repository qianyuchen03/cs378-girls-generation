import React, { useState } from 'react';
import TripCard from '../../components/TripCard';
import tripsData from '../../data/tripsData';
import TripModal from '../../components/TripModal';
import './SavedBoard.css'

const SavedScreen = () => {
    const [savedTrips, setSavedTrips] = useState(tripsData);
    const [selectedTrip, setSelectedTrip] = useState(null);
  
    const handleRemoveTrip = (id) => {
      setSavedTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
    };
  
    const handleOpenModal = (trip) => {
      setSelectedTrip(trip);
    };
  
    const handleCloseModal = () => {
      setSelectedTrip(null);
    };
  
    return (
      <div className="container">
        <h1 className="header">Saved</h1>
        <div className="trips-list">
          {savedTrips.length > 0 ? (
            savedTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onRemove={handleRemoveTrip} onOpenModal={handleOpenModal} />
            ))
          ) : (
            <p>No saved trips available.</p>
          )}
        </div>
        {selectedTrip && <TripModal trip={selectedTrip} onClose={handleCloseModal} />}
      </div>
    );
  };

export default SavedScreen;