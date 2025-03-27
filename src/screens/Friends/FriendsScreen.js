// FriendsScreen.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./FriendsScreen.css";

const FriendsScreen = () => {
  const navigate = useNavigate();
  const friends = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "AJ",
      boards: [
        { id: 1, title: "Travel", image: "🌴" },
        { id: 2, title: "Food", image: "🍕" },
        { id: 3, title: "Work", image: "💻" },
        { id: 4, title: "Music", image: "🎵" },
        { id: 5, title: "Fitness", image: "🏋️" },
      ],
    },
    {
      id: 2,
      name: "Sam Wilson",
      avatar: "SW",
      boards: [
        { id: 1, title: "Art", image: "🎨" },
        { id: 2, title: "Books", image: "📚" },
        { id: 3, title: "Games", image: "🎮" },
      ],
    },
  ];

  const handleBoardClick = (friend, board) => {
    navigate(`/board/${friend.id}/${board.id}`, {
      state: { friend, board },
    });
  };

  return (
    <div className="friends-screen">
      <h2>Friends</h2>

      <div className="friends-list">
        {friends.map((friend) => (
          <div key={friend.id} className="friend-container">
            {/* Fixed profile section */}
            <div className="friend-profile">
              <div className="friend-avatar">{friend.avatar}</div>
              <h3 className="friend-name">{friend.name}</h3>
            </div>

            {/* Scrollable boards container */}
            <div className="boards-scroll-container">
              <div className="boards-scroll">
                {friend.boards.map((board) => (
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
