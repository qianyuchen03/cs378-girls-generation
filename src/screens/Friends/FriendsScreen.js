// FriendsScreen.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./FriendsScreen.css";
import camping from "../../assets/board-icons/camping.jpeg"
import defaultIcon from "../../assets/board-icons/default.png";
import caves from "../../assets/board-icons/caves.avif"
import desert from "../../assets/board-icons/desert.jpeg"
import foliage from "../../assets/board-icons/foliage.jpeg"
import souks from "../../assets/board-icons/souks.jpeg"
import sakura from "../../assets/board-icons/sakura.jpeg"
import surf from "../../assets/board-icons/surf.jpeg"
import waterfall from "../../assets/board-icons/waterfall.jpg"
import winery from "../../assets/board-icons/winery.jpeg"
import yoga from "../../assets/board-icons/yoga.jpeg"
import haunted from "../../assets/board-icons/haunted.jpeg"


const FriendsScreen = () => {
  const navigate = useNavigate();
  const friends = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "AJ",
      boards: [
        { id: 1, title: "Camping", image: camping },
        { id: 2, title: "Caves", image: caves },
        { id: 3, title: "Desert", image: desert },
        { id: 4, title: "Foliage", image: foliage },
        { id: 5, title: "Morocco", image: souks },
      ],
    },
    {
      id: 2,
      name: "Sam Wilson",
      avatar: "SW",
      boards: [
        { id: 1, title: "Japan", image: sakura },
        { id: 2, title: "Surf", image: surf },


      ],
    },
    {
      id: 3,
      name: "Taylor Smith",
      avatar: "TS",
      boards: [
        { id: 1, title: "Yoga", image: yoga },
        { id: 2, title: "Bali", image: waterfall },
      ],
    },
    {
      id: 4,
      name: "Jordan Lee",
      avatar: "JL",
      boards: [
        { id: 1, title: "Winery", image: winery },
      ],
    },
    {
      id: 5,
      name: "Casey Kim",
      avatar: "CK",
      boards: [
        { id: 1, title: "Haunted", image: haunted },
        { id: 2, title: "Waterfall", image: waterfall },
      ],
    }
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
                    <div className="board-icon">
                      <img 
                        src={board.image} 
                        alt={board.title}
                        className="board-image"
                        onError={(e) => {
                          e.target.src = defaultIcon;
                          e.target.alt = "Default board icon";
                        }}
                      />
                    </div>
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