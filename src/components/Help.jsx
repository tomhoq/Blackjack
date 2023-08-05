import "../css/help.css"

export default function Help() {
    return (
        <div id="text">
            <h1>How to play</h1>
            <hr></hr>
            <div className="rules">
                <p>Wackjack is a silly version of blackjack. The rules are the same, but the cards are different.</p>
                <p>The objective of Blackjack is to get a hand value as close to 21 as possible without exceeding it. 
                Number cards have their face value, face cards (Jacks, Queens, Kings) are worth 10, and Aces can be 1 or 11.
                <br></br>
                You start with two cards, and the dealer has one face-up and one face-down card. Use the "Hit" button to get an additional card or "Stand" to keep your current hand.
                <br></br>
                After you decide to stand, the dealer reveals their face-down card and must hit until their hand value is 17 or higher.

                If your hand is closer to 21 than the dealer's or the dealer busts, you win. 

                </p>
                
                <h4>Consider the dealer's face-up card and your hand value to make the best decision. Have fun!</h4>

                <h2>Hitting on soft 17 Option</h2>
                <p> When the dealer's hand has a total value of 17 and one of the cards is an Ace worth 11 points, the dealer will take another card (hit) rather than standing. 
                <br></br>This option can be turned on in the settings</p>
            </div>

            
        </div>
    )
}