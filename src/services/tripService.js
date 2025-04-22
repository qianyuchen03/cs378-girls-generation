import { collection, addDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const tripsRef = collection(db, 'trips');

export const addTrip = async (trip) => {
  await addDoc(tripsRef, trip);
};

export const getAllTrips = async () => {
  const snapshot = await getDocs(tripsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getSavedTrips = async () => {
  const savedQuery = query(tripsRef, where('saved', '==', true));
  const snapshot = await getDocs(savedQuery);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getUnsavedTrips = async () => {
  const savedQuery = query(tripsRef, where('saved', '==', false));
  const snapshot = await getDocs(savedQuery);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveTrip = async (tripId) => {
  const tripDoc = doc(db, 'trips', tripId);
  await updateDoc(tripDoc, { saved: true });
};

export const unsaveTrip = async (tripId) => {
  const tripDoc = doc(db, 'trips', tripId);
  await updateDoc(tripDoc, { saved: false });
};

export const getRecommendedTrips = async (userTags) => {
  // Get all trips that aren't saved yet
  const baseQuery = query(tripsRef, where('saved', '==', false));
  const snapshot = await getDocs(baseQuery);
  
  // Extract user's top 3 tags
  const topTags = userTags.slice(0, 3);
  
  // Process and rank trips
  const trips = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    // Calculate match score (number of matching tags)
    matchScore: doc.data().tags
      ? doc.data().tags.filter(tag => topTags.includes(tag)).length
      : 0
  }));
  
  // Filter trips with at least one matching tag
  const matchingTrips = trips.filter(trip => trip.matchScore > 0);
  
  return matchingTrips;
};