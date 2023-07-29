import '../css/navbar.css';
import settings from "../assets/settings.png"
import { Link } from 'react-router-dom';


export default function Navbar(props) {
  const {toggleSettings } = props;

  return (
    <div id = "navbar">
      <Link id="nav-title" to="/" >WACKJACK</Link>
      <img id="logo" onClick={toggleSettings} src={settings} alt="logo" />
    </div >
  )
}
