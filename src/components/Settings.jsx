import '../css/settings.css';

export default function Settings(){

    return (
        <div className="settings">
            <h1>Settings</h1>
            <label className="switch">
                <h4>Display player points</h4>
                <input type="checkbox"/>
                    <span className="slider round"></span>
            </label>
            <label className="switch">
                <div className="check">
                    <h4>Display dealer points</h4>
                    <input type="checkbox"/>
                        <span className="slider round"></span>
                </div>
            </label>
            <label className="switch">
                <div className="check">
                    <h4>Restart game automatically</h4>
                    <input type="checkbox"/>
                        <span className="slider round"></span>
                </div>
            </label>
            <h2>Appearance</h2>
            <label className="switch">
                <h4>Dark mode</h4>
                <div className="check">
                    <input type="checkbox"/>
                        <span className="slider round"></span>
                </div>
            </label>
        </div>
    )
}