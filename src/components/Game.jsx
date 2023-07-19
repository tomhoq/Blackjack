import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from './Navbar';
import "../css/game.css"

export default function Game() {

  const [deck, setDeck] = useState({});
  const [cardsPiled, setCardsPiled] = useState([]);
  const [points, setPoints] = useState(0); // State variable for points
  const [buttonClicked, setButtonClicked] = useState(false);
  const [busted, setBusted] = useState(false);

  /*OneTime creates deck*/
  useEffect(function() {
    console.log("created deck");
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => res.json())
      .then(data => setDeck(data));
  }, []);

  useEffect(() => {
    var c_points = 0;
    for (const card of cardsPiled) {
      if (card.cards[0].code[0] === 'Q' || card.cards[0].code[0] === 'K' || card.cards[0].code[0] === 'J' || card.cards[0].code[0] === '0') {
        c_points += 10;
      } else if (card.cards[0].code[0] === 'A') {
        var add = 0;
        if (points + 11 > 21) add = 1;
        else add = 11;
        c_points += add;
      } else {
        c_points += parseInt(card.cards[0].code[0]);
      }
    }
    setPoints(c_points);
  
    if (c_points > 21) {
      setTimeout(() => setBusted(true), 900); // Corrected syntax of setTimeout
    }
  }, [cardsPiled]);
  

/*Fetches card from existing deck and pushes it to cardsPiled*/
function addCard() {
  if(!buttonClicked){
    setButtonClicked(true);
      if (deck.deck_id) {
        fetch(`https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
          .then(res => res.json())
          .then(card => {    
            const copy = [...cardsPiled];
            copy.push(card);
            setCardsPiled(copy);
            setButtonClicked(false);
          });
      }
  }
}


  return (
    <>
        <Navbar />
        <div id="game" style={{ filter: busted ? 'blur(5px)' : 'none' }}>
          <div id="dealer">
            <h4>Dealer</h4>
          </div>
          Points:
            {points}
            cards:
            {cardsPiled.length !== 0 && cardsPiled.map(card=> (card.cards[0].value))}
          <div id="player">
            <h4>You</h4>
            
            {cardsPiled.length !== 0 && cardsPiled.map((card, index) => (
                <img
                  key={card.cards[0].code}
                  style={{
                    position: 'absolute',
                    top: `${index * 50}px`, // Adjust the value to control the vertical overlapping
                    left: `${index * 100}px`, // Adjust the value to control the horizontal overlapping
                    zIndex: index, // Stacking order based on the card index (latest card on top)
                    margin: index === 0 ? '50px' : '0',
                  }}
                  src={card.cards[0].image}
                  alt={card.cards[0].images.svg}
                />
              ))}
          </div>
        </div>
        <div id="buttons" style={{ filter: busted ? 'blur(5px)' : 'none' }}>
          <button onClick={addCard}>Hit</button>
          <button>Stand</button>
        </div>
    </>
  )
}