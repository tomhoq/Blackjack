import '../css/main.css';
import cards from "./../assets/cards.png";
import logo from "./../assets/heart.png";

export default function Home() {
    return (
        <div className="main">
            <div className="vertical">
                <img id= "logo" src={logo} />
                <h1 id="title">WACKJACK</h1>
                <h4 id="subtitle">The silly blackjack</h4>
                <button id="play">PLAY NOW</button>
            </div>
            <div className="white"></div>
            <div className="horizontal">
                <img src={cards} />
                <p>Make 1.000.000€ NOW</p>
                <img src={cards}/>
            </div>
            <div className="made">
                <p>Made with <span>❤</span> by</p>
                <a href="https://github.com/tomhoq">@tomhoq</a>
            </div>
        </div>
    )
}