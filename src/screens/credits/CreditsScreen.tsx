import React from 'react';
import { Screens, ScreenSelectorProps } from '../types';
// import { useStyles } from './styles';
import { useInGameScreenPush } from '../../helpers/useInGameScreenPush';


const CreditsScreen = (props: ScreenSelectorProps): JSX.Element => {
    // const styles = useStyles();
    const { screenHandlers } = useInGameScreenPush(props);

    return (
        <div>
            <h1>Space and Void</h1>
            <div>
                <h2>Credits</h2>
                <div>
                    Author: <b>Maciej Kaczanowski</b>
                </div>
                <button onClick={() => screenHandlers.gotToSelectedScreen(Screens.MainMenu)}>
                    Back to Main Menu
                </button>
            </div>
        </div>
    );
};

export default CreditsScreen;
