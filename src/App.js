import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FriendsScreen from './screens/Friends/FriendsScreen';
import HomeScreen from './screens/Home/HomeScreen';
import FriendBoardScreen from './screens/FriendBoard/FriendBoardScreen';
import SaveToBoardsScreen from './screens/SaveToBoards/SaveToBoardsScreen';
import SavedScreen from './screens/SavedBoard/SavedBoard';
import RecommendationsScreen from './screens/Recommendations/RecommendationsScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import LoginScreen from './screens/Login/LoginScreen';
import CreateAccountScreen from './screens/Login/CreateAccountScreen';
import UserBoardScreen from './screens/UserBoard/UserBoardScreen';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userBoards, setUserBoards] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('userBoards');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Nightlife', images: [] },
      { id: 2, name: 'Springbreak', images: [] },
      { id: 3, name: 'Nature', images: [] },
      { id: 4, name: 'City', images: [] },
      { id: 5, name: 'International', images: [] },
    ];
  });

  // Save to localStorage whenever userBoards changes
  useEffect(() => {
    localStorage.setItem('userBoards', JSON.stringify(userBoards));
  }, [userBoards]);

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <Router>
      <div className="App">
        <div className="">
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/friends" element={<FriendsScreen />} />
                <Route path="/board/:friendId/:boardId" element={<FriendBoardScreen />} />
                <Route 
                  path="/save-to-boards" 
                  element={
                    <SaveToBoardsScreen 
                      userBoards={userBoards} 
                      setUserBoards={setUserBoards} 
                    />
                  } 
                />
                <Route 
                  path="/saved" 
                  element={<SavedScreen userBoards={userBoards} />} 
                />
                <Route path="/recommendations" element={<RecommendationsScreen />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProfileScreen 
                      userBoards={userBoards} 
                      setUserBoards={setUserBoards} 
                    />
                  } 
                />
                <Route 
                  path="/board/:boardId" 
                  element={
                    <UserBoardScreen 
                      userBoards={userBoards} 
                    />
                  } 
                />
              </>
            ) : (
              <>
                <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
                <Route path="/create-account" element={<CreateAccountScreen onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </div>

        {isAuthenticated && <Navbar />}
      </div>
    </Router>
  );
}

export default App;