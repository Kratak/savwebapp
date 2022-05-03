import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import { useInGameScreenPush } from '../../helpers/useInGameScreenPush';
import { useGameSaves } from '../../helpers';
import { initialSaveSlots, SlotDataProps } from '../loads';
import { GlobalDataProviderProps } from '../../App';

import { Screens, ScreenSelectorProps } from '../types';
import { useStyles } from './styles';


//yyyy-MM-dd:HH-mm-ss
// todo get luxon
const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDay() + 1} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const NewGameScreen = (props: ScreenSelectorProps): JSX.Element => {
    const styles = useStyles();
    const { screenHandlers } = useInGameScreenPush(props);
    const { getSaveSlot } = useGameSaves();

    const [slotData, setSlotData] = useState<Array<SlotDataProps>>([]);

    const handleSelectSlot = (slotId: string) => () => {
        const dataToSet: GlobalDataProviderProps = {
            ...props.globalData,
            currentScreen: Screens.InGameSimpleBattlefield,
            currentSaveData: {
                ...props.globalData.currentSaveData,
                id: slotId,
            },
        };
        props.setGlobalDataProvider(dataToSet);
    };

    const handleBackToMainMenu = () => {
        screenHandlers.gotToSelectedScreen(Screens.MainMenu);
    };

    useEffect(() => {
        let dataToDisplay = [...initialSaveSlots.map(item => ({ ...item, disabled: false }))];

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

    }, []);


    return (
        <div className={styles.mainMenuWrapper}>
            <h1 className={styles.gameTitle}>Start new game</h1>
            <h2>Select save slot</h2>
            <div className={styles.buttonsWrapper}>
                {slotData.map(slot => (<Button
                    key={slot.saveId}
                    className={styles.actionButton}
                    disabled={slot.disabled}
                    onClick={handleSelectSlot(slot.saveId)}
                    variant={'outlined'}
                >
                    <span>
                        {slot.name}
                    </span>
                    {slot.date !== null && <span style={{ fontSize: 9 }}>{formatDate(new Date(slot.date))}</span>}
                </Button>))}
                <Button
                    className={styles.actionButton}
                    onClick={handleBackToMainMenu}
                    variant={'outlined'}>
                    Back to Main Menu
                </Button>
            </div>
        </div>
    );
};

export default NewGameScreen;
