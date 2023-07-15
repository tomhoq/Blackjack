import { useState } from 'react'
import { useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar';

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
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App
