import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FriendsScreen from './screens/Friends/FriendsScreen';
import HomeScreen from './screens/Home/HomeScreen';
import Recommendations from './components/Recommendations';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Main content area with padding bottom to avoid navbar overlap */}
        <div className="content pb-5">
          <Recommendations />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/friends" element={<FriendsScreen />} />
          </Routes>
        </div>
        
        {/* Navbar at the bottom */}
        <Navbar />
      </div>
    </Router>
  );
}

export default App;