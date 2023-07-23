import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from './Navbar';
import "../css/game.css"
import back from "../assets/back.png"

export default function Game() {

  const [deck, setDeck] = useState({});
  const [cardsPiled, setCardsPiled] = useState([]);
  const [cardsDealer, setCardsDealer] = useState([]);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [draw, setDraw] = useState(false);
  const [points, setPoints] = useState(0); // State variable for points
  const [buttonClicked, setButtonClicked] = useState(false);
  const [busted, setBusted] = useState(false);
  const [stand, setStand] = useState(false);


  /*OneTime creates deck*/
  useEffect(function() {
    if (!deck.deck_id){
      fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => setDeck(data));
      setTimeout(()=> {
        addCardDealer();
        setTimeout(() => addCardDealer, 440);
      }, 400);
    }
  }, []);

  /*Counts points every time a card is added to pile deck */
  useEffect(() => {
    var c_points = 0;
    c_points = countCards(cardsPiled);
    setPoints(c_points);
  
    if (c_points > 21) {
      setTimeout(() => setBusted(true), 1240); // Corrected syntax of setTimeout
    }
  }, [cardsPiled]);

  /*Game busted */
  useEffect(() => {
    if (busted||won||lost||draw) {
      setTimeout(() => {
        // Replace '/new-page' with the URL of the page you want to redirect to
        window.location.reload();
      }, 2000);
    }
  }, [busted,won,lost,draw]); 
  

  /*Fetches card from existing deck and pushes it to cardsPiled*/
  function addCard() {
    if(!buttonClicked && !busted && !stand){
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

  function countCards(cards){
    var c_points = 0;
    var got_A_11 = false;
    if (cards.length === 0) return 0;
    for (const card of cards) {
      if (card.cards[0].code[0] === 'Q' || card.cards[0].code[0] === 'K' || card.cards[0].code[0] === 'J' || card.cards[0].code[0] === '0') {
        c_points += 10;
      } else if (card.cards[0].code[0] === 'A') {
        var add = 0;
        if (points + 11 > 21) add = 1;
        else{
          got_A_11 = true;
          add = 11;
        }
        c_points += add;
      } else {
        c_points += parseInt(card.cards[0].code[0]);
      }
    }
    if (got_A_11 && c_points > 21) c_points -= 10;
    return c_points;
  }


  function addCardDealer() {
    console.log("added card to dealer", deck)
    if (deck.deck_id) {
      fetch(`https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        .then(res => res.json())
        .then(card => {    
          const copy = [...cardsDealer];
          copy.push(card);
          setCardsDealer(copy);
          console.log("cards",cardsDealer);
        });
    }
  }

  async function standPlay() {
    if (stand !== true && !busted) {
      console.log("stand");
      setStand(true);
      var points = 0;
      var cards = [...cardsDealer];
      while (points < 17) {
        console.log("stand while, points: ", points, countCards(cards), cards);
        if (deck.deck_id) {
          const res = await fetch(
            `https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
          );
          const card = await res.json();
          cards.push(card); // Assuming card.cards is an array with a single card object
          points = countCards(cards);
          console.log("Pushed ",card.cards[0].value, " to ", cards, cardsPiled);
        }
      }
      setCardsDealer(cards);
      var points_player = countCards(cardsPiled);
      setTimeout(() => {
        if (points > 21 ||points < points_player) {
          setWon(true);
        } else if (points > points_player) {
          setLost(true);
        } else if (points === points_player) {
          setDraw(true);
        }
      }, 1000);
    }
  }

  console.log("d: ",cardsDealer.map(card=> (card.cards[0].value)));

  return (
    <>
        <Navbar />
        {
          busted && <div className="overlay">
                      <h1 className="overlay-text">Busted</h1>
                    </div>
        }
        {
          won && <div className="overlay">
                      <h1 className="overlay-text">Won</h1>
                    </div>
        }
        {
          lost && <div className="overlay">
                      <h1 className="overlay-text">Lost</h1>
                    </div>
        }
        {
          draw && <div className="overlay">
                      <h1 className="overlay-text">Draw</h1>
                    </div>
        }
        <div id="game" style={{ filter: draw||busted||won||lost? 'blur(5px)' : 'none' }}>
          <div id="dealer">
            <h4>Dealer</h4>
            {cardsDealer.length !== 0 && cardsDealer.map((card, index) => (
                <img
                  key={card.cards[0].code}
                  style={{
                    position: 'absolute',
                    top: `${index * 50}px`, // Adjust the value to control the vertical overlapping
                    left: `${index * 100}px`, // Adjust the value to control the horizontal overlapping
                    zIndex: index, // Stacking order based on the card index (latest card on top)
                    margin: index === 0 ? '50px' : '0',
                  }}
                  src= {stand===false && index === 0 ? back : card.cards[0].image}
                  alt={card.cards[0].images.svg}
                />
              ))}
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
          <button onClick={standPlay}>Stand</button>
        </div>
    </>
  )
}