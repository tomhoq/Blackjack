import '../css/settings.css';
import { motion } from 'framer-motion';

export default function Settings(props){
    const {togglePlayerPoints, showPlayerPoints, 
                toggleDealerPoints, showDealerPoints,
                toggleHitSoft, hitSoft,
                toggleRestartGameAutomatically, restartGameAutomatically,
                toggleTheme, theme,
                toggleSettings, toggleHelp, showHelp
            } = props;
    
    if (showHelp) toggleHelp();
    return (
        <div id={`${theme}-settings`}>
            <div className="settings">
                <h1>Settings</h1>

                <div className="option">
                    <p>Display dealer’s points:</p>
                    <label className="switch">
                        <input onChange={toggleDealerPoints} checked={showDealerPoints} type="checkbox"/>
                        <span className="slider"></span>
                    </label>
                </div>
                
                <div className="option">
                    <p>Display player’s points:</p>
                    <label className="switch">
                        <input onChange={togglePlayerPoints} checked={showPlayerPoints} type="checkbox"/>
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="option">
                    <p>Dealer hits on soft 17:</p>
                    <label className="switch">
                        <input onChange={toggleHitSoft} checked={hitSoft} type="checkbox"/>
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="option">
                    <p>Restart Game Automatically:</p>
                    <label className="switch">
                        <input onChange={toggleRestartGameAutomatically} checked={restartGameAutomatically} type="checkbox"/>
                        <span className="slider"></span>
                    </label>
                </div>

                <h2>Appearance</h2>
                <div className="option">
                    <p>Dark mode:</p>
                    <label className="switch">
                        <input id="themeCheckbox" onChange={toggleTheme} checked={theme === 'dark'} type="checkbox"/>
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="ok">
                    <motion.button id="hitButton" 
                                    onClick={toggleSettings} whileHover={{scale:1.1}} 
                                    whileTap={{ scale: 0.9,transition: { duration: 0.2 } }}>
                        Ok!
                    </motion.button>

                </div>

            </div>
        </div>
    )
}