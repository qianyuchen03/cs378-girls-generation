import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <Router>
      <div className="App">
        <div className="content pb-5">
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/friends" element={<FriendsScreen />} />
                <Route path="/board/:friendId/:boardId" element={<FriendBoardScreen />} />
                <Route path="/save-to-boards" element={<SaveToBoardsScreen />} />
                <Route path="/saved" element ={<SavedScreen />} />
                <Route path="/recommendations" element ={<RecommendationsScreen />} />
                <Route path="/profile" element ={<ProfileScreen />} />
              </>
            ) : (
              <>
                <Route path="/login" element ={<LoginScreen onLogin={handleLogin} />} />
                <Route path="/create-account" element ={<CreateAccountScreen onLogin={handleLogin} />} />
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