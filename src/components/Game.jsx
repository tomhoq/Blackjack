import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from './Navbar';
import "../css/game.css"
import back from "../assets/back.png"

export default function Game() {

  const [deck, setDeck] = useState({});
  const [deck_id, setDeck_id] = useState("");
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
    const fetchDeckAndAddCardDealer = async () => {
      if (!deck.deck_id) {
        try {
          const data = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
          const json = await data.json();
          setDeck(json);
          setTimeout(() => {
            setDeck_id(json.deck_id);
          }, 400);
        } catch (error) {
          console.error("Error fetching deck:", error);
        }
      }
    };
    console.log('i fire once');
    fetchDeckAndAddCardDealer();
  }, []);

  useEffect(() => {
    if (deck_id) {
      fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
        .then(res => res.json())
        .then(card => {console.log("Pused 2 to dealer")
          setCardsDealer(card.cards);
        });
        fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
        .then(res => res.json())
        .then(card => {console.log("Pused 2 to player");
          setCardsPiled(card.cards);
        });
    }
  },[deck_id]);

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

  /*Add card to dealer on stand*/
  useEffect(() => {
    console.log("use effe add card dealer")

    if (stand === true && !busted) {
      console.log("stand true")

      var points = countCards(cardsDealer);
      var cards = [...cardsDealer];

      if (points < 17) {
        console.log("points < 17")

        if (deck.deck_id) {
          fetch(
            `https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
          ).then(res => res.json())
          .then(card => {console.log("Pushing ",card);
            cards.push(card)
            setTimeout(() => {
            setCardsDealer(prev => [...prev, ...card.cards]);}, 600);
          });

          console.log(cards);
        }

      } else { 
        var points_player = countCards(cardsPiled);

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
    if(!buttonClicked && !busted && !stand){
      setButtonClicked(true);
        if (deck.deck_id) {
          fetch(`https://www.deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
            .then(res => res.json())
            .then(card => {    
              setCardsPiled(prev => [...prev, ...card.cards]);
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
      if (card.code[0] === 'Q' || card.code[0] === 'K' || card.code[0] === 'J' || card.code[0] === '0') {
        c_points += 10;
      } else if (card.code[0] === 'A') {
        var add = 0;
        if (points + 11 > 21) add = 1;
        else{
          got_A_11 = true;
          add = 11;
        }
        c_points += add;
      } else {
        c_points += parseInt(card.code[0]);
      }
    }
    if (got_A_11 && c_points > 21) c_points -= 10;
    return c_points;
  }
 
  async function standPlay() {
    if (stand !== true && !busted) {
      setStand(true);
    }
  }

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
            <div className="cards_dealer">
              {cardsDealer.length !== 0 && cardsDealer.map((card, index) => (
                  <img
                    key={card.code}
                    src= {stand===false && index === 0 ? back : card.image}
                    alt={card.images.svg}
                  />
                ))}
            </div>
          </div>
          Points:
          {points}
          cards:
          {cardsPiled.length !== 0 && cardsPiled.map(card=> (card.value))}
          <div id="player">
            <h4>You</h4>
            <div className="cards_player">
              {cardsPiled.length !== 0 && cardsPiled.map((card, index) => (
                  <img
                    key={card.code}
                    src={card.image}
                    alt={card.images.svg}
                  />
                ))}
            </div>
          </div>
        </div>
        <div id="buttons" style={{ filter: busted ? 'blur(5px)' : 'none' }}>
          <button onClick={addCard}>Hit</button>
          <button onClick={standPlay}>Stand</button>
        </div>
    </>
  )
}