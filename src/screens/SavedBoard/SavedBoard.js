import React, { useEffect, useState } from 'react';
import TripCard from '../../components/TripCard';
import TripModal from '../../components/TripModal';
import './SavedBoard.css'
import { getSavedTrips, unsaveTrip } from '../../services/tripService';

const SavedScreen = () => {
  const [savedTrips, setSavedTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    const fetchSavedTrips = async () => {
      const trips = await getSavedTrips();
      setSavedTrips(trips);
    };
    fetchSavedTrips();
  }, []);

  const handleToggleSave = async (id) => {
    await unsaveTrip(id);
    setSavedTrips(prevTrips => prevTrips.filter(trip => trip.id !== id));
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
        <div className="trips-list">
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