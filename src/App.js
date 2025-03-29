import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FriendsScreen from './screens/Friends/FriendsScreen';
import HomeScreen from './screens/Home/HomeScreen';
import FriendBoardScreen from './screens/FriendBoard/FriendBoardScreen';
import SaveToBoardsScreen from './screens/SaveToBoards/SaveToBoardsScreen';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Main content area with padding bottom to avoid navbar overlap */}
        <div className="content pb-5">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/friends" element={<FriendsScreen />} />
            <Route path="/board/:friendId/:boardId" element={<FriendBoardScreen />} />
            <Route path="/save-to-boards" element={<SaveToBoardsScreen />} />
          </Routes>
        </div>
        
        {/* Navbar at the bottom */}
        <Navbar />
      </div>
    </Router>
  );
}

export default App;