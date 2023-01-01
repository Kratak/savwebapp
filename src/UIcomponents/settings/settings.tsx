import React, { useCallback, useEffect, useState } from 'react';
import { MenuItem, Modal, Select, SelectChangeEvent } from '@mui/material';
import { ModalProps } from '@mui/material/Modal/Modal';

import { Screens, ScreenSelectorProps } from '../../screens/types';
import { ColorThemeObject } from '../../screens/gameScreens/simpleBattlefield/initials';
import { CurrentGameModes, useGameSaves } from '../../helpers';
// import { SlotDataProps, initialSaveSlots } from '../../screens/loads';
import { initialSaveSlots } from '../../screens/loads';
import { DataToSaveProps } from '../../screens/gameScreens/simpleBattlefield/types';

import { useStyles } from './styles';

export interface SettingsProps<ThemesKeys extends string, ColorKey extends string> extends ModalProps {
    settingsHandlers: SettingCustomHandlesProps<ThemesKeys>;
    passedValues: SettingPassedValuesProps<ThemesKeys>;
    saveData: DataToSaveProps<ColorKey>;
    screenSelectorProps: ScreenSelectorProps;
}

export interface SettingCustomHandlesProps<ThemesKeys extends string> {
    onClose: (isOpen: boolean) => void;
    setAmbientLightIntensity: (intensity: number) => void;
    setSelectedScreen: (scree: Screens) => void;
    setCameraZoom: (cameraZoom: number) => void;
    setSelectedTheme: (selectedTheme: ThemesKeys) => void;
    setWireframeOn: (toggle: boolean) => void;
};

export interface SettingPassedValuesProps<ThemesKeys> {
    intensity: number;
    cameraZoom: number;
    selectedTheme: ThemesKeys;
    availableThemes: Array<ColorThemeObject<ThemesKeys>>;
    wireframeOn: boolean;
}

export interface SaveSlotProps {
    saveId: string;
    name: string;
    date: Date | null;
}

export const newDate = new Date();


const saveIdPromProps = initialSaveSlots[0].saveId;

const Settings = <ThemeKeys extends string, ColorKey extends string>(props: SettingsProps<ThemeKeys, ColorKey>) => {
    const { settingsHandlers, passedValues, saveData, ...rest } = props;

    const styles = useStyles();
    const { save, getSaveSlot } = useGameSaves(props.screenSelectorProps);

    const [devSettingAllowed, setDevSettingAllowed] = useState<boolean>(true);
    // const [saveSlots, setSaveSlots] = useState<Array<SlotDataProps>>([...initialSaveSlots]);
    const [autoSaveId, setAutoSaveId] = useState<string>(saveIdPromProps);

    const handleChange = useCallback((event: SelectChangeEvent) => {
        settingsHandlers.setSelectedTheme(event.target.value as ThemeKeys);
    }, [settingsHandlers]);

    const handleCloseModal = useCallback(() => {
        settingsHandlers.onClose(false);
    }, [settingsHandlers]);

    const handleSave = useCallback((slotNumber: string) => {
        console.log('handleSave', slotNumber);
        let gameSaved = false;
        try {
            // todo format date on display
            // console.log(newDate.toUTCString());
            save({
                saveId: slotNumber,
                saveName: `${slotNumber} saved game`,
                date: newDate,
                metaGameData: {
                    shardCount: 0,
                },
                currentGameData: {
                    mode: CurrentGameModes.match3,
                    // galaxyMapPosition: 'position',
                    // scoreCounters: saveData.scoreCounters,
                },
            });
            gameSaved = true;

        } catch (e) {
            console.log('error durring save');
        }

        if (gameSaved) {
            handleCloseModal();
        }
    }, [save, handleCloseModal, saveData.scoreCounters]);

    const handleBackToMainMenu = async () => {
        await handleSave(autoSaveId);
        settingsHandlers.setSelectedScreen(Screens.MainMenu);
    };

    // useEffect(() => {
    //     getSaveSlot()
    //         .then((data) => {
    //             let newData = [...saveSlots];
    //             data.forEach((item, index) => newData[index] = item);
    //             setSaveSlots(newData);
    //         })
    //         .catch((e) => console.log(e));
    // }, [saveData]);

    useEffect(() => {
        if (props.saveData.saveId !== null) {
            setAutoSaveId(props.saveData.saveId);
        }
        getSaveSlot()
            .then(saveData => {
                if (saveData.length > 0) {
                    const savedFile = saveData.find(item => item.saveId === autoSaveId);
                    if (!!savedFile) {
                        console.log(savedFile);
                    }
                } else {
                    handleSave(initialSaveSlots[0].saveId);
                }
            })
            .catch(e => console.log('Issue with save load', e));

    }, [autoSaveId, getSaveSlot, handleSave, props.saveData.saveId]);

    return (<Modal {...rest}>
        <div className={styles.module}>
            <div>
                settings
            </div>
            <div>
                <div>
                    <button onClick={handleCloseModal}>
                        close settings
                    </button>
                </div>
                <div>
                    <button onClick={() => settingsHandlers.setAmbientLightIntensity(passedValues.intensity + .1)}>
                        + .1
                    </button>
                    <span>{`light density:[${passedValues.intensity}]`}</span>
                    <button onClick={() => settingsHandlers.setAmbientLightIntensity(passedValues.intensity - .1)}>
                        - .1
                    </button>
                </div>
                <div>
                    <button onClick={() => settingsHandlers.setCameraZoom(passedValues.cameraZoom - 1)}>
                        + 1
                    </button>
                    <span>{`camera zoom/out:[${passedValues.cameraZoom}]`}</span>
                    <button onClick={() => settingsHandlers.setCameraZoom(passedValues.cameraZoom + 1)}>
                        - 1
                    </button>
                </div>
                <div>
                    <button onClick={() => setDevSettingAllowed(!devSettingAllowed)}>
                        {`Dev setting ${devSettingAllowed ? 'ON' : 'OFF'}`}
                    </button>
                </div>
                {devSettingAllowed && <div>
                    <span><strong>DEV:</strong></span>
                    <button onClick={() => settingsHandlers.setWireframeOn(!passedValues.wireframeOn)}>
                        {`Wireframe ${passedValues.wireframeOn ? 'ON' : 'OFF'}`}
                    </button>
                </div>}
                {devSettingAllowed && <div>
                    <span><strong>DEV:</strong></span>
                    <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={passedValues.selectedTheme}
                        label='Age'
                        onChange={handleChange}
                    >
                        {passedValues.availableThemes.map((item, index) => {
                            return <MenuItem key={item.label + index} value={item.value}>{item.label}</MenuItem>;
                        })}
                    </Select>
                </div>}
            </div>
            {/*{saveSlots.map((slot, index) => {*/}
            {/*    const message = !!slot.name && !!slot.date ? `${slot.name} ${new Date(slot.date).toUTCString()}` : `Save slot ${slot.saveId}`;*/}
            {/*    return (*/}
            {/*        <button key={`${index}-${slot.saveId}`} onClick={() => handleSave(slot.saveId)}>*/}
            {/*            {message}*/}
            {/*        </button>*/}
            {/*    );*/}
            {/*})}*/}

            <button onClick={handleBackToMainMenu}>
                Save and go to Main Menu
            </button>


        </div>
    </Modal>);
};

export default Settings;
