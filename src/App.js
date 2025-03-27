import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Recommendatations from './components/Recommendations';

function App() {
  return (
    <div className="App">
      <Recommendatations/>
      <Navbar/>
    </div>
  );
}

export default App;
