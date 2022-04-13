import React, { useEffect, useState } from 'react';
import { MenuItem, Modal, Select, SelectChangeEvent } from '@mui/material';
import { ModalProps } from '@mui/material/Modal/Modal';

import { Screens } from '../../screens/types';
import { ColorThemeObject } from '../../screens/newGameFiber/initials';
import { CurrentGameModes, useGameSaves } from '../../helpers';
import { getRandomInt } from '../../gameModes/simple';
import { DataToSaveProps } from '../../screens/newGameFiber/types';

import { useStyles } from './styles';

export interface SettingsProps<ThemesKeys extends string, ColorKey extends string> extends ModalProps {
    customHandles: SettingCustomHandlesProps<ThemesKeys>;
    passedValues: SettingPassedValuesProps<ThemesKeys>;
    saveData: DataToSaveProps<ColorKey>;
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

export const availableSaveSlots: Array<SaveSlotProps> = [
    {
        saveId: '1',
        name: '',
        date: null,
    }, {
        saveId: '2',
        name: '',
        date: null,
    }, {
        saveId: '3',
        name: '',
        date: null,
    },
];

const Settings = <ThemeKeys extends string, ColorKey extends string>(props: SettingsProps<ThemeKeys, ColorKey>) => {
    const { customHandles, passedValues, saveData, ...rest } = props;

    const styles = useStyles();
    const { save, getSaveSlot } = useGameSaves();

    const [devSettingAllowed, setDevSettingAllowed] = useState<boolean>(true);
    const [saveSlots, setSaveSlots] = useState<Array<SaveSlotProps>>([...availableSaveSlots]);

    const handleChange = (event: SelectChangeEvent) => {
        customHandles.setSelectedTheme(event.target.value as ThemeKeys);
    };

    const handleCloseModal = () => {
        customHandles.onClose(false);
    };

    const handleSave = (slotNumber: string) => {
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
                    galaxyMapPosition: 'position',
                    scoreCounters: saveData.scoreCounters,
                },
            });
            gameSaved = true;

        } catch (e) {
            console.log('error durring save');
        }

        if (gameSaved) {
            handleCloseModal();
        }
    };

    useEffect(() => {
        getSaveSlot()
            .then((data) => {
                let newData = [...saveSlots];
                data.forEach((item, index) => newData[index] = item);
                setSaveSlots(newData);
            })
            .catch((e) => console.log(e));
    }, [saveData]);

    return (<Modal {...rest}>
        <div className={styles.module}>
            <div>
                settings
            </div>
            <div>
                <div>
                    <button onClick={() => customHandles.setSelectedScreen(Screens.MainMenu)}>
                        Back to Main Menu
                    </button>

                </div>
                <div>
                    <button onClick={() => customHandles.setAmbientLightIntensity(passedValues.intensity + .1)}>
                        + .1
                    </button>
                    <span>{`light density:[${passedValues.intensity}]`}</span>
                    <button onClick={() => customHandles.setAmbientLightIntensity(passedValues.intensity - .1)}>
                        - .1
                    </button>
                </div>
                <div>
                    <button onClick={() => customHandles.setCameraZoom(passedValues.cameraZoom - 1)}>
                        + 1
                    </button>
                    <span>{`camera zoom/out:[${passedValues.cameraZoom}]`}</span>
                    <button onClick={() => customHandles.setCameraZoom(passedValues.cameraZoom + 1)}>
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
                    <button onClick={() => customHandles.setWireframeOn(!passedValues.wireframeOn)}>
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
            {saveSlots.map((slot, index) => {
                const message = !!slot.name && !!slot.date ? `${slot.name} ${new Date(slot.date).toUTCString()}` : `Save slot ${slot.saveId}`;
                return (
                    <button key={`${index}-${slot.saveId}`} onClick={() => handleSave(slot.saveId)}>
                        {message}
                    </button>
                );
            })}

            <button onClick={handleCloseModal}>
                close modal
            </button>

        </div>
    </Modal>);
};

export default Settings;
