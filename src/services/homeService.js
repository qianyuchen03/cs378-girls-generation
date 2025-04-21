import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const picsRef = collection(db, 'home-pictures');

export const getAllPics = async () => {
  const snapshot = await getDocs(picsRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,          // Include document ID
    ...doc.data()        // Spread all document fields
  }));
};