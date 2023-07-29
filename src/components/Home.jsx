import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';
import cards from "./../assets/cards.png";
import logo from "./../assets/heart.png";

export default function Home() {
    const [windowResolution, setWindowResolution] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
      // Function to update the window resolution
      const updateWindowResolution = () => {
        setWindowResolution({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
    
      // useEffect to update the resolution on component mount and window resize
      useEffect(() => {
        updateWindowResolution(); // Initial update
    
        const handleResize = () => {
          updateWindowResolution(); // Update on window resize
        };
    
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize); // Cleanup on unmount
        };
      }, []);
    
      return (
        <div className="main">
          <div className="vertical">
            <img className="logo" src={logo} />
            <h1 id="title">WACKJACK</h1>
            <h4 id="subtitle">The silly blackjack</h4>
            <Link to="/play" id="play">PLAY NOW</Link>
            <div className="white"></div>
          </div>
          <div className="horizontal">
            <img id="left" src={cards} />
            <img id="right" src={cards} />
          </div>
          <div className="made">
            <p>Made with <span>❤️</span> by</p>
            <a href="https://github.com/tomhoq" target="_blank">@tomhoq</a>
          </div>
    
          {/* Display the window resolution */}
          <p id="r">Window Resolution: {windowResolution.width}px x {windowResolution.height}px</p>
        </div>
      );
    }