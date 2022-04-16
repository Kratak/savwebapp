import React from 'react';
import { Screens, ScreenSelectorProps } from '../types';
import { useStyles } from './styles';
import { Button } from '@mui/material';


const MainMenu = (props: ScreenSelectorProps): JSX.Element => {
    const styles = useStyles();

    return (
        <div className={styles.mainMenuWrapper}>
            <h1 className={styles.gameTitle}>Space and Void</h1>
            <div className={styles.buttonsWrapper}>
                <Button className={styles.actionButton} variant={'outlined'}
                        disabled={true}>Resume</Button>
                <Button variant={'outlined'} className={styles.actionButton} disabled={true}
                        onClick={() => props.setSelectedScreen(Screens.Game)}>
                    New game
                </Button>
                <Button variant={'outlined'} className={styles.actionButton}
                        onClick={() => props.setSelectedScreen(Screens.GameFaber)}>
                    New game FIBER
                </Button>
                <Button variant={'outlined'} className={styles.actionButton} disabled={true}>Load game</Button>
                <Button variant={'outlined'} className={styles.actionButton}
                        onClick={() => props.setSelectedScreen(Screens.Settings)}>
                    Setting
                </Button>
                <Button variant={'outlined'} className={styles.actionButton}
                        onClick={() => props.setSelectedScreen(Screens.Credits)}>
                    Credits
                </Button>
                <Button variant={'outlined'} className={styles.actionButton} disabled={true}>Exit</Button>
            </div>
        </div>
    );
};

export default MainMenu;
