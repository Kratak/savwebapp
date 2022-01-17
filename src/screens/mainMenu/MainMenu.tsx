import React from 'react';
import { Screens, ScreenSelectorProps } from '../types';
import { useStyles } from './styles';


const MainMenu = (props: ScreenSelectorProps): JSX.Element => {
    const styles = useStyles();

    return (
        <div>
            <h1>Space and Void</h1>
            <div>
                <button disabled={true}>Resume</button>
                <button disabled={true} onClick={() => props.setSelectedScreen(Screens.Game)}>
                    New game
                </button>
                <button onClick={() => props.setSelectedScreen(Screens.GameFaber)}>
                    New game FIBER
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

export default MainMenu;
