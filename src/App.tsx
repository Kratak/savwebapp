import React, { useState } from 'react';
import './App.css';
import { Screens } from './screens/types';
import { ScreenSelector } from './screens';

// TODO add material-ui

const App = () => {
    const [currentScreen, setCurrentScreen] = useState<Screens>(
        Screens.MainMenu
    );
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
};

export default App;
