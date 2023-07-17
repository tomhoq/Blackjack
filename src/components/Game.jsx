import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from './Navbar';
import "../css/game.css"

export default function Game() {

  const [deck, setDeck] = useState({});
  const [cardsPiled, setCardsPiled] = useState([]);


  /*OneTime creates deck*/
  useEffect(function() {
    console.log("created deck");
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => res.json())
      .then(data => setDeck(data));
  }, []);


  /*Fetches card from existing deck and pushes it to cardsPiled*/
  function addCard() {
    console.log(deck.deck_id);
    if (deck.deck_id) {
      console.log("p");
      fetch(`https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        .then(res => res.json())
        .then(card => {
          const copy = [...cardsPiled];
          copy.push(card);
          setCardsPiled(copy);
        });
    }
  }

  return (
    <>
        <Navbar />
        <div id="game">
          <div id="dealer">
            <h4>Dealer</h4>
          </div>
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
                    margin: index === 0 ? '20px' : '0',
                  }}
                  src={card.cards[0].image}
                  alt={card.cards[0].images.svg}
                />
              ))}
          </div>
        </div>
        <div id="buttons">
          <button onClick={addCard}>Hit</button>
          <button>Stand</button>
        </div>
    </>
  )
}