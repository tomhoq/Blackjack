import { useState } from 'react'
import { useEffect } from 'react'
import cards from "../assets/cartas.png"
import Navbar from './Navbar';
import Settings from './Settings';
import Help from './Help'
import {motion } from 'framer-motion';

import "../css/game.css"
import back from "../assets/back.png"

export default function Game(props) {
  const {theme, toggleTheme} = props;

  const [deck, setDeck] = useState({});
  const [deck_id, setDeck_id] = useState("");
  const [cardsPiled, setCardsPiled] = useState([]);
  const [cardsDealer, setCardsDealer] = useState([]);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [draw, setDraw] = useState(false);
  const [points, setPoints] = useState(0); // State variable for points
  const [dealerPoints, setDealerPoints] = useState(0); // State variable for points
  const [buttonClicked, setButtonClicked] = useState(false);
  const [busted, setBusted] = useState(false);
  const [stand, setStand] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);


  /*Toggle settings*/
  const initialShowPlayerPoints = localStorage.getItem("showPlayerPoints") === "true" || false;
  const [showPlayerPoints, setShowPlayerPoints] = useState(initialShowPlayerPoints);
  const initialShowDealerPoints = localStorage.getItem("showDealerPoints") === "true" || false;
  const [showDealerPoints, setShowDealerPoints] = useState(initialShowDealerPoints);
  const initialHitSoft = localStorage.getItem("hitSoft") === "true" || false;
  const [hitSoft, setHitSoft] = useState(initialHitSoft);


  

  function toggleSettings() {
    setShowSettings(prev => !prev);
  }

  function toggleHelp() {
    setShowHelp(prev => !prev);
  }

  const togglePlayerPoints = (event) => {
    setShowPlayerPoints(event.target.checked);
    localStorage.setItem("showPlayerPoints", event.target.checked.toString());
  };

  const toggleDealerPoints = (event) => {
    setShowDealerPoints(event.target.checked);
    localStorage.setItem("showDealerPoints", event.target.checked.toString());
  };

  const toggleHitSoft = (event) => {
    setHitSoft(event.target.checked);
    localStorage.setItem("hitSoft", event.target.checked.toString());
  };

  /*OneTime creates deck*/
  useEffect(function() {
    const fetchDeckAndAddCardDealer = async () => {
      if (!deck_id) {
        try {
          const data = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
          const json = await data.json();
          setDeck(json);
          setDeck_id(json.deck_id);

        } catch (error) {
          console.error("Error fetching deck:", error);
        }
      }
    };

    fetchDeckAndAddCardDealer();
  }, []);

  /*Onetime gives starting cards*/
  useEffect(() => {
    console.log("giving starting cards", stand, won, lost, draw, busted);
    if (!(stand||won||lost||draw||busted)) {
      console.log("giving ");
      if (deck_id !== "") {
        fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
          .then(res => res.json())
          .then(card => {
            setCardsDealer(card.cards);
            setDealerPoints(countCards([card.cards[1]]));
          });
          fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
          .then(res => res.json())
          .then(card => {
            setCardsPiled(card.cards);
          });
      }
    }
  },[stand, busted, won, lost, draw, deck_id]);


  /*Counts points every time a card is added to pile deck */
  useEffect(() => {
    var c_points = 0;
    c_points = countCards(cardsPiled)[0];
    setPoints(c_points);
  
    if (c_points === 21) 
      document.getElementById('hitButton').disabled = true;

    if (c_points > 21) {
      document.getElementById('standButton').disabled = true;
      document.getElementById('hitButton').disabled = true;
      setTimeout(() => setBusted(true), 1240); // Corrected syntax of setTimeout
    }
  }, [cardsPiled]);


  /*Add card to dealer on stand*/
  useEffect(() => {

    if (stand === true && !busted) {
      var [points,got_A11] = countCards(cardsDealer);
      var cards = [...cardsDealer];

      setDealerPoints(points);
      if ((points === 17 && got_A11 && hitSoft) || points < 17) {
        
        if (deck_id) {
          fetch(
            `https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
          ).then(res => res.json())
          .then(card => {
            cards.push(card)
            setTimeout(() => {
            setCardsDealer(prev => [...prev, ...card.cards]);}, 600);
          });

        }

      } else { 
        var points_player = countCards(cardsPiled)[0];

        setTimeout(() => 
        {
          if (points > 21 || points < points_player) {
            setWon(true);
          } else if (points > points_player) {
            setLost(true);
          } else if (points === points_player) {
            setDraw(true);
          }
        }, 1500);
      }
    };
  },[stand,cardsDealer]);  

  /*Fetches card from existing deck and pushes it to cardsPiled*/
  function addCard() {
    console.log("clicked hit", !buttonClicked, !busted, !stand);
    if(!buttonClicked && !busted && !stand){
      setButtonClicked(true);
      fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        .then(res => res.json())
        .then(card => {    
          if (card)
            setCardsPiled(prev => [...prev, ...card.cards]);
          setButtonClicked(false);
        });
    }
  }

  console.log("buttonClicked", buttonClicked);

  /*Returns points in hand*/
 /* console.log("8,8,a,10",countCards([{code:"8S"},{code:"8D"},{code:"AS"}]))*/
  function countCards(cards){
    var c_points = 0;
    var got_A_11 = false;
    if (cards.length === 0) return [0,false];

    for (const card of cards) 
    {
      if (card.code[0] === 'Q' || card.code[0] === 'K' || card.code[0] === 'J' || card.code[0] === '0') 
      {
        c_points += 10;
      } 
      else if (card.code[0] === 'A') 
      {
        var add = 0;
        if (c_points + 11 > 21) add = 1;

        else{
          got_A_11 = true;
          add = 11;
        }
        c_points += add;
      } 
      else 
      {
        c_points += parseInt(card.code[0]);
      }

    }

    if (got_A_11 && c_points > 21){
      c_points -= 10;
      got_A_11 = false;
    }

    return [c_points,got_A_11];
  }
 
  /*toggle stand*/
  function standPlay() {
    if (stand === false || busted || won || lost || draw) {
      setStand(true);
      console.log("disabling");
      document.getElementById('standButton').disabled = true;
      document.getElementById('hitButton').disabled = true;

    }
  }


  /*Reset variables*/
  function restartGame() {
    setDeck({});

    fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log("Deck shuffled successfully");
        // Additional code for what to do after shuffling
      } else {
        console.log("Error shuffling deck");
      }
    })
    .catch(error => {
      console.error("An error occurred:", error);
    });
    
    setCardsPiled([]);
    setCardsDealer([]);
    setWon(false);
    setLost(false);
    setDraw(false);
    setPoints(0); // State variable for points
    setDealerPoints(0);
    setButtonClicked(false);
    setBusted(false);
    setStand(false);
  }


  return (
    <div className="body">
      <div id={theme}>
          <div className="shadows"></div>
          <Navbar toggleSettings={toggleSettings} toggleHelp={toggleHelp} />
          {showSettings && 
            <Settings showPlayerPoints={showPlayerPoints} togglePlayerPoints={togglePlayerPoints} 
                      showDealerPoints={showDealerPoints} toggleDealerPoints={toggleDealerPoints}
                      hitSoft={hitSoft} toggleHitSoft={toggleHitSoft}
                      theme={theme} toggleTheme={toggleTheme}
                      toggleSettings={toggleSettings} toggleHelp={toggleHelp} showHelp={showHelp}/>
          }

          {showHelp && <Help />}

          {
            busted && <div onClick={draw||busted||won||lost ? restartGame : null}className="overlay">
                        <h1 className="overlay-text">Busted</h1>
                      </div>
          }
          {
            won && <div onClick={draw||busted||won||lost ? restartGame : null} className="overlay">
                        <h1 className="overlay-text">Won</h1>
                      </div>
          }
          {
            lost && <div onClick={draw||busted||won||lost ? restartGame : null} className="overlay">
                        <h1 className="overlay-text">Lost</h1>
                      </div>
          }
          {
            draw && <div onClick={draw||busted||won||lost ? restartGame : null} className="overlay">
                        <h1 className="overlay-text">Draw</h1>
                      </div>
          }

          <div id="game" onClick={draw||busted||won||lost ? restartGame : null} 
                        style={{ filter: showHelp||showSettings? 'blur(7px)' : 'none' }}>

            <div className="place">
              <div className="task">
                <h4>Dealer</h4>
                {showDealerPoints && <h1 className="pointsPlayer">{dealerPoints}</h1>}
              </div>
              <div className="cards_dealer">
                {cardsDealer.length !== 0 && cardsDealer.map((card, index) => (
                    <img
                      key={card.code}
                      className="card"
                      src= {stand===false && index === 0 ? back : card.image}
                      alt={card.images.svg}
                    />
                  ))}
              </div>
            </div>
            <img src={cards} id="foto"/>
            <div className="place">
              <div className="task">
                <h4>You</h4>
                {showPlayerPoints && <h1 className="pointsPlayer">{points}</h1>}
              </div>
              <div className="cards_player">
                {cardsPiled.length !== 0 && cardsPiled.map((card, index) => (
                    <img
                      className="card-animate"
                      key={card.code}
                      src={card.image}
                      alt={card.images.svg}
                    />
                  ))}
              </div>
            </div>

          </div>
          
          {!draw && !busted && !won && !lost &&
          <div id="buttons" style={{ filter: busted||draw||won||lost||showSettings||showHelp   ? 'blur(5px)' : 'none' }}>
            <motion.button id="hitButton" disabled={showSettings||showHelp} onClick={addCard} whileHover={{scale:1.1}} whileTap={{ scale: 0.9,transition: { duration: 0.2 } }}>Hit</motion.button>
            <motion.button id="standButton" disabled={showSettings||showHelp} onClick={standPlay} whileHover={{scale:1.1}} whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}>Stand</motion.button>
          </div>
          }
      </div>
    </div>
  )
}