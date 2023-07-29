import '../css/settings.css';

export default function Settings(props){
    const {togglePlayerPoints, showPlayerPoints} = props;
    console.log(showPlayerPoints)
    return (
        <div className="settings">
            <h1>Settings</h1>
            <div className="option">
                <p>Display player’s points:</p>
                <label className="switch">
                    <input onChange={togglePlayerPoints} checked={showPlayerPoints} type="checkbox"/>
                    <span className="slider"></span>
                </label>
            </div>

            <div className="option">
                <p>Display dealer’s points:</p>
                <label className="switch">
                    <input type="checkbox"/>
                    <span className="slider"></span>
                </label>
            </div>
                
            <div className="option">
                <p>Restart Game Automatically:</p>
                <label className="switch">
                    <input type="checkbox"/>
                    <span className="slider"></span>
                </label>
            </div>

            <h2>Appearance</h2>
            <div className="option">
                <p>Dark mode:</p>
                <label className="switch">
                    <input type="checkbox"/>
                    <span className="slider"></span>
                </label>
            </div>

        </div>
    )
}