
import './App.css'
import Home from './components/Home.jsx'
import Game from './components/Game';
import {Route, Routes} from 'react-router-dom';

function App() {
 
  return (
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Game />} />
    </Routes>
  );
}

export default App
