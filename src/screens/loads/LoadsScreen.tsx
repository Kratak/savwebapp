import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

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
    const { getSaveSlot, deleteSave } = useGameSaves();

    const [slotData, setSlotData] = useState<Array<SlotDataProps>>([]);
    const [openModal, setOpenModal] = useState(false);
    const [saveToDelete, setSaveToDelete] = useState<null | string>(null);


    const handleOpenModal = (saveId: string) => {
        setSaveToDelete(saveId);
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setSaveToDelete(null);
        setOpenModal(false);
    };
    const handleLoadGame = () => {
        screenHandlers.gotToSelectedScreen(Screens.InGameSimpleBattlefield);
    };

    const handleDeleteSave = () => {
        if (!!saveToDelete) {
            deleteSave(saveToDelete)
                .then(() => {
                    console.log('LoadsScreen: Save deleted');
                    handleCloseModal();
                })
                .catch(() => {
                    console.log('LoadsScreen: Issue during save delete');
                    handleCloseModal();
                });
        }

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
                console.log('LoadsScreen: Issue during load saves', e);
                setSlotData(dataToDisplay);

            });

    }, [saveToDelete]);


    return (
        <div className={styles.mainMenuWrapper}>
            <h1 className={styles.gameTitle}>Load game from save</h1>
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
            >
                <DialogTitle id='alert-dialog-title'>
                    Delete {saveToDelete}?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                       You can't revert this action.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button  variant='contained' color='error' onClick={handleDeleteSave} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <div className={styles.buttonsWrapper}>
                {slotData.map(slot => (<div className={styles.buttonWrapper} key={slot.saveId}>
                    <Button
                        className={styles.actionButton}
                        disabled={slot.disabled}
                        onClick={handleLoadGame}
                        variant={'outlined'}>
                        {slot.name}
                    </Button>
                    {!slot.disabled &&
                        <DeleteForeverTwoToneIcon
                            onClick={() => handleOpenModal(slot.saveId)}
                            className={styles.deleteIcon} />}
                </div>))}
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

export default LoadsScreen;
