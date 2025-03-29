// screens/Friends/FriendsScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FriendBoardScreen.css';

const FriendsScreen = () => {
  const navigate = useNavigate();

  const friends = [
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'AJ',
      boards: [
        { id: 1, title: 'Travel', image: '✈️' },
        { id: 2, title: 'Food', image: '🍕' },
        { id: 3, title: 'Work', image: '💼' }
      ]
    },
    {
      id: 2,
      name: 'Sam Wilson',
      avatar: 'SW',
      boards: [
        { id: 1, title: 'Fitness', image: '🏋️' },
        { id: 2, title: 'Recipes', image: '🍳' }
      ]
    },
    {
      id: 3,
      name: 'Taylor Smith',
      avatar: 'TS',
      boards: [
        { id: 1, title: 'Art', image: '🎨' },
        { id: 2, title: 'Photography', image: '📷' },
        { id: 3, title: 'Design', image: '✏️' }
      ]
    },
    {
      id: 4,
      name: 'Jordan Lee',
      avatar: 'JL',
      boards: [
        { id: 1, title: 'Music', image: '🎵' },
        { id: 2, title: 'Concerts', image: '🎤' }
      ]
    },
    {
      id: 5,
      name: 'Casey Kim',
      avatar: 'CK',
      boards: [
        { id: 1, title: 'Tech', image: '💻' },
        { id: 2, title: 'Gadgets', image: '📱' },
        { id: 3, title: 'Coding', image: '👨‍💻' }
      ]
    }
  ];

  const handleBoardClick = (friend, board) => {
    navigate(`/board/${friend.id}/${board.id}`, {
      state: { friend, board }
    });
  };

  return (
    <div className="friends-screen">
      <h2>Friends</h2>
      <div className="friends-list">
        {friends.map(friend => (
          <div key={friend.id} className="friend-container">
            <div className="friend-profile">
              <div className="friend-avatar">{friend.avatar}</div>
              <h3 className="friend-name">{friend.name}</h3>
            </div>
            <div className="boards-scroll-container">
              <div className="boards-scroll">
                {friend.boards.map(board => (
                  <div 
                    key={board.id} 
                    className="board-card"
                    onClick={() => handleBoardClick(friend, board)}
                  >
                    <div className="board-icon">{board.image}</div>
                    <div className="board-title">{board.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsScreen;