import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';
import cards from "./../assets/cards.png";
import logo from "./../assets/heart.png";
import {motion } from 'framer-motion';

export default function Home(props) {
    // Get the theme from the context
    const { theme, toggleTheme } = props;


    
      return (
        <div id={theme}>
          <div className="vertical">
            <div className="shadow">
            </div>
            <img className="logo" src={logo} />
            <h1 id="title">WACKJACK</h1>
            <h4 id="subtitle">The simplified blackjack</h4>
            <motion.div>

              <Link to="/play" id="play">PLAY NOW</Link>
            </motion.div>
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
    
          {/* Display the window resolution <p id="r">Window Resolution: {windowResolution.width}px x {windowResolution.height}px</p>*/}
          
        </div>
      );
    }