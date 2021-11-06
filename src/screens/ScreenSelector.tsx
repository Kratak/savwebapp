import React from 'react';
import { Screens, ScreenSelectorProps } from './types';
import { useStyles } from './styles';


const ScreenSelector = (props: ScreenSelectorProps) => {
    const styles = useStyles();
    if (props.selectedScree === Screens.Settings) {
        return (
            <div>
                <h2 className={styles.module}>Settings</h2>
                <button onClick={() => props.setSelectedScreen(Screens.MainMenu)}>
                    Back to Main Menu
                </button>
            </div>
        );
    }
    if (props.selectedScree === Screens.Game) {
        return (
            <div>
                <h2>'Game screen'</h2>
                <button onClick={() => props.setSelectedScreen(Screens.MainMenu)}>
                    Back to Main Menu
                </button>
            </div>
        );
    }
    if (props.selectedScree === Screens.Credits) {
        return (
            <div>
                <h2>Credits</h2>
                <div>
                    Author: <b>Maciej Kaczanowski</b>
                </div>
                <button onClick={() => props.setSelectedScreen(Screens.MainMenu)}>
                    Back to Main Menu
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1>Space and Void</h1>
            <div>
                <button disabled={true}>Resume</button>
                <button onClick={() => props.setSelectedScreen(Screens.Game)}>
                    New game
                </button>
                <button disabled={true}>Load game</button>
                <button onClick={() => props.setSelectedScreen(Screens.Settings)}>
                    Setting
                </button>
                <button onClick={() => props.setSelectedScreen(Screens.Credits)}>
                    Credits
                </button>
                <button disabled={true}>Exit</button>
            </div>
        </div>
    );
};

export default ScreenSelector;
