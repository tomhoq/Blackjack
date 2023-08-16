import '../css/navbar.css';
import settings from "../assets/settings.png"
import question from "../assets/question-mark.png"
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar(props) {
  const {toggleSettings, toggleHelp } = props;

  return (
    <div id = "navbar">
      <Link id="nav-title" to="/" >WACKJACK</Link>
      <div className="items">
        <motion.img id="help" onClick={toggleHelp} src={question} 
          whileHover={{ rotate: 30, transition: { duration: 0.01, ease: 'linear'} }}
          whileTap={{ scale: 0.5,transition: { duration: 0.2 }, ease: 'linear' }}/>
        <img id="logo" onClick={toggleSettings} src={settings} alt="logo" />
      </div>
    </div >
  )
}
