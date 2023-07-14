import { useState } from 'react'
import { useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [deck, setDeck] = useState({})
  const [cardsPiled, setCardsPilled] = useState([])

  useEffect(function() {
    console.log("created deck")
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => res.json())
      .then(data => setDeck(data))
  }, [])
  
  function addCard() {
    console.log(deck.deck_id)
    if (deck.deck_id){
      console.log("p")
      fetch(`https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        .then(res => res.json())
        .then(card => {
            const copy = [...cardsPiled]
            copy.push(card)
            setCardsPilled(copy)})
        
    }
  }

  return (
    <>
      <button onClick={addCard}>Add Card</button>
      <Navbar />
      <pre>{JSON.stringify(deck, null, 2)}</pre>
      <pre>{JSON.stringify(cardsPiled, null, 2)}</pre>
    </>
  )
}

export default App
