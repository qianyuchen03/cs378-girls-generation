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

export const unsaveTrip = async (tripId) => {
  const tripDoc = doc(db, 'trips', tripId);
  await updateDoc(tripDoc, { saved: false });
};