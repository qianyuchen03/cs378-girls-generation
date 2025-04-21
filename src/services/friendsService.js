import { db } from '../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

export const fetchFriendBoardImages = async (friendId, boardId) => {
  try {
    const q = query(
      collection(db, 'friends-pictures'),
      where('friendId', '==', friendId),
      where('boardId', '==', boardId)
    );
    
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    
    return items;
  } catch (error) {
    console.error('Error fetching friend board images:', error);
    throw error;
  }
};


export const fetchFirstBoardImage = async (friendId, boardId) => {
    try {
      const q = query(
        collection(db, 'friends-pictures'),
        where('friendId', '==', friendId),
        where('boardId', '==', boardId),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      }
      return null;
    } catch (error) {
      throw error;
    }
  };