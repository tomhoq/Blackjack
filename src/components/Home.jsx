import { Link } from 'react-router-dom';
import '../css/home.css';
import cards from "./../assets/cards.png";
import logo from "./../assets/heart.png";

export default function Home() {
    return (
        <div className="main">
            <div className="vertical">
                <img id= "logo" src={logo} />
                <h1 id="title">WACKJACK</h1>
                <h4 id="subtitle">The silly blackjack</h4>
                <Link to = "/play" id="play">PLAY NOW</Link>
                <div className="white"></div>
            </div>
            <div className="horizontal">
                <img id="left" src={cards} />
                <div className="made">
                    <p>Made with <span>❤️</span> by</p>
                    <a href="https://github.com/tomhoq">@tomhoq</a>
                </div>
                <img id="right" src={cards}/>
            </div>
            
        </div>
    )
}