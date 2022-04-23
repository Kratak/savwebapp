import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

import { useInGameScreenPush } from '../../helpers/useInGameScreenPush';
import { useGameSaves } from '../../helpers';

import { Screens, ScreenSelectorProps } from '../types';
import { useStyles } from './styles';
import { SlotDataProps } from './types';

export const initialSaveSlots: Array<SlotDataProps> = [
    {
        saveId: 'Slot 1',
        name: 'Slot 1',
        disabled: true,
        date: null,
    }, {
        saveId: 'Slot 2',
        name: 'Slot 2',
        disabled: true,
        date: null,
    }, {
        saveId: 'Slot 3',
        name: 'Slot 3',
        disabled: true,
        date: null,
    },
];

const LoadsScreen = (props: ScreenSelectorProps): JSX.Element => {
    const styles = useStyles();
    const { screenHandlers } = useInGameScreenPush(props);
    const { getSaveSlot } = useGameSaves();

    const [slotData, setSlotData] = useState<Array<SlotDataProps>>([]);

    const handleLoadGame = () => {
        screenHandlers.gotToSelectedScreen(Screens.GameFaber);
    };

    const handleBackToMainMenu = () => {
        screenHandlers.gotToSelectedScreen(Screens.MainMenu);
    };

    useEffect(() => {
        setSlotData(initialSaveSlots);
        getSaveSlot()
            .then((saveData) => {
                console.log(saveData);
            })
            .catch(e => console.log('Issue during load saves', e));
    }, []);

    return (
        <div className={styles.mainMenuWrapper}>
            <h1 className={styles.gameTitle}>Load game from save</h1>
            <div className={styles.buttonsWrapper}>
                {slotData.map(slot => (<Button
                    key={slot.saveId}
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
