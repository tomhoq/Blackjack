import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import Game from './components/Game';
import {Route, Routes} from 'react-router-dom';

function App() {
  const [deck, setDeck] = useState({});
  const [cardsPiled, setCardsPiled] = useState([]);

  useEffect(function() {
    console.log("created deck");
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => res.json())
      .then(data => setDeck(data));
  }, []);

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
  /*<button onClick={addCard}>Add Card</button>
      <Navbar />
      <pre>{JSON.stringify(deck, null, 2)}</pre>
      <pre>{JSON.stringify(cardsPiled, null, 2)}</pre>
      {cardsPiled.length !== 0 && cardsPiled.map(card => (
        <img key={card.cards[0].code} src={card.cards[0].image} alt={card.cards[0].images.svg} />
      ))}*/
  return (
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Game />} />
    </Routes>
  );
}

export default App
