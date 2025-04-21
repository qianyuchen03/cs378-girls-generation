import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

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

// Optional: You can add more friend-related service functions here
// For example:
// export const addFriend = async (friendData) => {...}
// export const removeFriend = async (friendId) => {...}