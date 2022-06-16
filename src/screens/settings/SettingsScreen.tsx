import React from 'react';
import { Screens, ScreenSelectorProps } from '../types';
// import { useStyles } from './styles';
import { useInGameScreenPush } from '../../helpers/useInGameScreenPush';


const SettingsScreen = (props: ScreenSelectorProps): JSX.Element => {
    const { screenHandlers } = useInGameScreenPush(props);
    // const styles = useStyles();

    return (
        <div>
            <h1>Space and Void</h1>
            <div>
                <h2>SettingsScreen</h2>
                <button onClick={() => screenHandlers.gotToSelectedScreen(Screens.MainMenu)}>
                    Back to Main Menu
                </button>
            </div>
        </div>
    );
};

export default SettingsScreen;
