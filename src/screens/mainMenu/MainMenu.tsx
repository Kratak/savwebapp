import React from 'react';
import { Button } from '@mui/material';
import { Screens, ScreenSelectorProps } from '../types';

import { useMainMenu } from './useMainMenu';


const MainMenu = (props: ScreenSelectorProps): JSX.Element => {
    const { styles, flags, handlers, screenHandlers } = useMainMenu(props);

    return (
        <div className={styles.mainMenuWrapper}>
            <h1 className={styles.gameTitle}>Space and Void</h1>
            <div className={styles.buttonsWrapper}>
                <Button
                    className={styles.actionButton}
                    disabled={!flags.resumeAvailable}
                    onClick={handlers.handleResumeGame}
                    variant={'outlined'}>
                    Resume
                </Button>
                {/*<Button*/}
                {/*    variant={'outlined'}*/}
                {/*    className={styles.actionButton}*/}
                {/*    disabled={true}*/}
                {/*    onClick={() => screenHandlers.gotToSelectedScreen(Screens.Game)}>*/}
                {/*    old New game*/}
                {/*</Button>*/}
                <Button
                    className={styles.actionButton}
                    onClick={handlers.handleStartNewGame}
                    variant={'outlined'}>
                    New game
                </Button>
                <Button
                    className={styles.actionButton}
                    disabled={!flags.loadAvailable}
                    onClick={handlers.handleOpenLoadScreen}
                    variant={'outlined'}
                >
                    Load game
                </Button>
                <Button
                    variant={'outlined'}
                    className={styles.actionButton}
                    onClick={handlers.handleOpenSettingsScreen}>
                    Setting
                </Button>
                <Button
                    variant={'outlined'}
                    className={styles.actionButton}
                    onClick={() => screenHandlers.gotToSelectedScreen(Screens.Credits)}>
                    Credits
                </Button>
                <Button
                    variant={'outlined'}
                    className={styles.actionButton}
                    disabled={true}>
                    Exit
                </Button>
            </div>
        </div>
    );
};

export default MainMenu;
