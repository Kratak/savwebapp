import React, { useState } from 'react';
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

export const newDate = new Date();

const Settings = <ThemeKeys extends string, ColorKey extends string>(props: SettingsProps<ThemeKeys, ColorKey>) => {
    const { customHandles, passedValues, saveData, ...rest } = props;
    const [devSettingAllowed, setDevSettingAllowed] = useState<boolean>(true);
    const styles = useStyles();
    const { save } = useGameSaves();

    const handleChange = (event: SelectChangeEvent) => {
        customHandles.setSelectedTheme(event.target.value as ThemeKeys);
    };

    const handleCloseModal = () => {
        customHandles.onClose(false);
    };

    const handleSave = (slotNumber: number) => {
        let gameSaved = false;
        try {
            // todo format date on display
            // console.log(newDate.toUTCString());
            save({
                saveId: slotNumber.toString(),
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
            <button onClick={() => handleSave(1)}>
                Save slot 1
            </button>
            <button onClick={() => handleSave(2)}>
                Save slot 2
            </button>
            <button onClick={() => handleSave(3)}>
                Save slot 3
            </button>
            <button onClick={handleCloseModal}>
                close modal
            </button>
        </div>
    </Modal>);
};

export default Settings;
