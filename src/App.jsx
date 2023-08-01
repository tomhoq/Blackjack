import React, { useState } from 'react';
import './App.css'
import Home from './components/Home.jsx'
import Game from './components/Game';
import {Route, Routes} from 'react-router-dom';
import { createContext } from 'react';

export const ThemeContext = React.createContext(null);

function App() {
  const initialTheme = localStorage.getItem("darkMode") === "true" ? "dark" : "light";

  // State variable for theme
  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    localStorage.setItem("darkMode", event.target.checked.toString());

  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <Routes> 
        <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/play" element={<Game theme={theme} toggleTheme={toggleTheme}/>} />
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App
