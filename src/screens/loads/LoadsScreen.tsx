import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

import { Screens, ScreenSelectorProps } from '../types';
import { useStyles } from './styles';
import { useInGameScreenPush } from '../../helpers/useInGameScreenPush';


interface SlotDataProps {
    name: string;
    id: string;
    disabled: boolean;
}

const initialData: Array<SlotDataProps> = [
    {
        id: 'Slot 1',
        name: 'Slot 1',
        disabled: true,
    }, {
        id: 'Slot 2',
        name: 'Slot 2',
        disabled: true,
    }, {
        id: 'Slot 3',
        name: 'Slot 3',
        disabled: true,
    },
];

const LoadsScreen = (props: ScreenSelectorProps): JSX.Element => {
    const styles = useStyles();
    const { screenHandlers } = useInGameScreenPush(props);

    const [slotData, setSlotData] = useState<Array<SlotDataProps>>([]);

    const handleLoadGame = () => {
        screenHandlers.gotToSelectedScreen(Screens.GameFaber);
    };

    const handleBackToMainMenu = () => {
        screenHandlers.gotToSelectedScreen(Screens.MainMenu);
    };

    useEffect(() => {
        setSlotData(initialData);
    }, []);

    return (
        <div className={styles.mainMenuWrapper}>
            <h1 className={styles.gameTitle}>Load game from save</h1>
            <div className={styles.buttonsWrapper}>
                {slotData.map(slot => (<Button
                    key={slot.id}
                    className={styles.actionButton}
                    disabled={slot.disabled}
                    onClick={handleLoadGame}
                    variant={'outlined'}>
                    {slot.name}
                </Button>))}
                <Button
                    className={styles.actionButton}
                    // disabled={!flags.resumeAvailable}
                    onClick={handleBackToMainMenu}
                    variant={'outlined'}>
                    Back to Main Menu
                </Button>
            </div>
        </div>
    );
};

export default LoadsScreen;
