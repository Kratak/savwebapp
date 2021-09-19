import React, {useState} from 'react';
import './App.css';

// TODO add material-ui

enum Screens {
    MainMenu = 'MainMenu',
    Game = 'Game',
    Settings = 'Settings',
    Credits = 'Credits'
}

interface ScreenSelectorProps {
    selectedScree: Screens;
    setSelectedScreen: (screen: Screens) => void;
}

const ScreenSelector = (props: ScreenSelectorProps) => {
    if (props.selectedScree === Screens.Settings) {
        return (<div>Settings</div>)
    }
    if (props.selectedScree === Screens.Game) {
        return (<div>Game</div>)
    }
    if (props.selectedScree === Screens.Credits) {
        return (<div>Credits</div>)
    }

    return <div>MainMenu</div>

}
const App = () => {
    const [currentScreen, setCurrentScreen] = useState<Screens>(Screens.MainMenu)
    return (
        <div className="App">
            <header className="App-header">
                <ScreenSelector
                    selectedScree={currentScreen}
                    setSelectedScreen={(screen) => setCurrentScreen(screen)}
                />
            </header>
        </div>
    );
}

export default App;
