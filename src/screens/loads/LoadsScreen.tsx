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
        screenHandlers.gotToSelectedScreen(Screens.InGameSimpleBattlefield);
    };

    const handleBackToMainMenu = () => {
        screenHandlers.gotToSelectedScreen(Screens.MainMenu);
    };

    useEffect(() => {
        let dataToDisplay = [...initialSaveSlots];

        getSaveSlot()
            .then((saveData) => {
                dataToDisplay = dataToDisplay.map(item => {
                    const searchedSave = saveData.find(singleSave => singleSave.saveId === item.saveId);
                    if (typeof searchedSave !== 'undefined') {
                        return {
                            ...searchedSave,
                            disabled: false,
                        };
                    }
                    return item;
                });
                setSlotData(dataToDisplay);
            })
            .catch(e => {
                console.log('Issue during load saves', e);
                setSlotData(dataToDisplay);

            });

    }, [getSaveSlot]);


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
