import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FriendsScreen.css";
import defaultIcon from "../../assets/board-icons/default.png";
import { fetchFirstBoardImage } from "../../services/friendsService";

const FriendsScreen = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // All potential friends (including current friends) - removed hardcoded images
  const [allPeople, setAllPeople] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "AJ",
      isFriend: true,
      boards: [
        { id: 1, title: "Camping" },
        { id: 2, title: "Sports" },
        { id: 3, title: "Desert" },
      ],
    },
    {
      id: 2,
      name: "Sam Wilson",
      avatar: "SW",
      isFriend: true,
      boards: [
        { id: 1, title: "Japan" },
        { id: 2, title: "Surf" },
      ],
    },
    {
      id: 3,
      name: "Taylor Smith",
      avatar: "TS",
      isFriend: false,
      boards: [
        { id: 1, title: "Yoga" },
      ],
    },
    {
      id: 4,
      name: "Jordan Lee",
      avatar: "JL",
      isFriend: false,
      boards: [
        { id: 1, title: "Winery" },
      ],
    },
    {
      id: 5,
      name: "Casey Kim",
      avatar: "CK",
      isFriend: false,
      boards: [
        { id: 1, title: "City Vibes" },
      ],
    }
  ]);

  // Load board images from Firestore on component mount
  useEffect(() => {
    const loadBoardImages = async () => {
      const updatedPeople = await Promise.all(
        allPeople.map(async (person) => {
          const updatedBoards = await Promise.all(
            person.boards.map(async (board) => {
              try {
                const firstImage = await fetchFirstBoardImage(person.id, board.id);
                return {
                  ...board,
                  image: firstImage?.imageURL || defaultIcon
                };
              } catch (error) {
                console.error(`Error loading image for ${person.name}'s ${board.title}:`, error);
                return { ...board, image: defaultIcon };
              }
            })
          );
          return { ...person, boards: updatedBoards };
        })
      );
      setAllPeople(updatedPeople);
    };

    loadBoardImages();
  }, []);

  // Filter based on search term
  const filteredPeople = allPeople.filter(person => 
    searchTerm === "" || 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.boards.some(board => 
      board.title.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  // Toggle friend status
  const toggleFriend = (personId) => {
    setAllPeople(allPeople.map(person => 
      person.id === personId ? {...person, isFriend: !person.isFriend} : person
    ));
  };

  const handleBoardClick = (person, board) => {
    navigate(`/board/${person.id}/${board.id}`, {
      state: { 
        friend: person,
        board: board
      },
    });
  };

  return (
    <>
      <header className="app-header">
        <h1>Friends</h1>
      </header>
      <div className="friends-screen">
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
    </>
  );
};

export default FriendsScreen;