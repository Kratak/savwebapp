import React from 'react';
import { Screens, ScreenSelectorProps } from './types';

const ScreenSelector = (props: ScreenSelectorProps) => {
    if (props.selectedScree === Screens.Settings) {
        return (
            <div>
                <h2>Settings</h2>
                <div onClick={() => props.setSelectedScreen(Screens.MainMenu)}>
                    Back to Main Menu
                </div>
            </div>
        );
    }
    if (props.selectedScree === Screens.Game) {
        return (
            <div>
                <h2>'Game screen'</h2>
                <div onClick={() => props.setSelectedScreen(Screens.MainMenu)}>
                    Back to Main Menu
                </div>
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
                <br />
                <div onClick={() => props.setSelectedScreen(Screens.MainMenu)}>
                    Back to Main Menu
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1>Space and Void</h1>
            <div>
                <div>Resume</div>
                <div onClick={() => props.setSelectedScreen(Screens.Game)}>
                    New game
                </div>
                <div>Load game</div>
                <div onClick={() => props.setSelectedScreen(Screens.Settings)}>
                    Setting
                </div>
                <div onClick={() => props.setSelectedScreen(Screens.Credits)}>
                    Credits
                </div>
                <div>Exit</div>
            </div>
        </div>
    );
};

export default ScreenSelector;
