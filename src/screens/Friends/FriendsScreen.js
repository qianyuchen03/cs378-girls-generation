import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FriendsScreen.css";
// Import all board icons
import camping from "../../assets/board-icons/camping.jpeg";
import defaultIcon from "../../assets/board-icons/default.png";
import caves from "../../assets/board-icons/caves.avif";
import desert from "../../assets/board-icons/desert.jpeg";
import foliage from "../../assets/board-icons/foliage.jpeg";
import souks from "../../assets/board-icons/souks.jpeg";
import sakura from "../../assets/board-icons/sakura.jpeg";
import surf from "../../assets/board-icons/surf.jpeg";
import waterfall from "../../assets/board-icons/waterfall.jpg";
import winery from "../../assets/board-icons/winery.jpeg";
import yoga from "../../assets/board-icons/yoga.jpeg";
import haunted from "../../assets/board-icons/haunted.jpeg";

const FriendsScreen = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // All potential friends (including current friends)
  const [allPeople, setAllPeople] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "AJ",
      isFriend: true,
      boards: [
        { id: 1, title: "Camping", image: camping },
        { id: 2, title: "Caves", image: caves },
        { id: 3, title: "Desert", image: desert },
      ],
    },
    {
      id: 2,
      name: "Sam Wilson",
      avatar: "SW",
      isFriend: true,
      boards: [
        { id: 1, title: "Japan", image: sakura },
        { id: 2, title: "Surf", image: surf },
      ],
    },
    {
      id: 3,
      name: "Taylor Smith",
      avatar: "TS",
      isFriend: false,
      boards: [
        { id: 1, title: "Yoga", image: yoga },
      ],
    },
    {
      id: 4,
      name: "Jordan Lee",
      avatar: "JL",
      isFriend: false,
      boards: [
        { id: 1, title: "Winery", image: winery },
      ],
    },
    {
      id: 5,
      name: "Casey Kim",
      avatar: "CK",
      isFriend: false,
      boards: [
        { id: 1, title: "Haunted", image: haunted },
      ],
    }
  ]);

  // Filter based on search term
  const filteredPeople = allPeople.filter(person => 
    searchTerm === "" || 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.boards.some(board => 
      board.title.toLowerCase().includes(searchTerm.toLowerCase())
  ))

  // Toggle friend status
  const toggleFriend = (personId) => {
    setAllPeople(allPeople.map(person => 
      person.id === personId ? {...person, isFriend: !person.isFriend} : person
    ));
  };

  const handleBoardClick = (person, board) => {
    navigate(`/board/${person.id}/${board.id}`, {
      state: { person, board },
    });
  };

  return (
    <div className="friends-screen">
      <h2>Friends</h2>
      
      {/* Unified Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search people or boards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="search-results">
          <h3>Search Results</h3>
          <div className="people-list">
            {filteredPeople.map((person) => (
              <div key={person.id} className="person-card">
                <div className="person-info">
                  <div className="person-avatar">{person.avatar}</div>
                  <div className="person-name">{person.name}</div>
                  <button 
                    onClick={() => toggleFriend(person.id)}
                    className={`friend-button ${person.isFriend ? 'remove' : 'add'}`}
                  >
                    {person.isFriend ? 'Remove Friend' : 'Add Friend'}
                  </button>
                </div>
                {person.boards.length > 0 && (
                  <div className="boards-scroll-container">
                    <div className="boards-scroll">
                      {person.boards.map((board) => (
                        <div
                          key={board.id}
                          className="board-card"
                          onClick={() => handleBoardClick(person, board)}
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
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Friends List */}
      <div className="friends-list">
        <h3>Your Friends</h3>
        {allPeople
          .filter(person => person.isFriend)
          .map((friend) => (
            <div key={friend.id} className="friend-container">
              <div className="friend-profile">
                <div className="friend-avatar">{friend.avatar}</div>
                <div className="friend-name">{friend.name}</div>
                <button 
                  onClick={() => toggleFriend(friend.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
              {friend.boards.length > 0 && (
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
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendsScreen;