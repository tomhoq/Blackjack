import '../css/navbar.css';
import settings from "../assets/settings.png"

export default function Navbar() {

  return (
    <div id = "navbar">
      <div id="nav-title">WACKJACK</div>
      <img id="logo" src={settings} alt="logo" />
    </div >
  )
}
