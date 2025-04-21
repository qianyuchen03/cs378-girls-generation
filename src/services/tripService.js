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
  // Get trips that match at least one of the user's top tags
  const recommendedQuery = query(
    tripsRef,
    where('tags', 'array-contains-any', userTags.slice(0, 3)),
    where('saved', '==', false)
  );
  
  const snapshot = await getDocs(recommendedQuery);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};