import '../css/navbar.css';
import settings from "../assets/settings.png"
import question from "../assets/question-mark.png"
import { Link } from 'react-router-dom';


export default function Navbar(props) {
  const {toggleSettings, toggleHelp } = props;

  return (
    <div id = "navbar">
      <Link id="nav-title" to="/" >WACKJACK</Link>
      <div className="items">
        <img id="help" onClick={toggleHelp} src={question} />
        <img id="logo" onClick={toggleSettings} src={settings} alt="logo" />
      </div>
    </div >
  )
}
