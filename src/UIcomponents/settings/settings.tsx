import React from 'react';
import { MenuItem, Modal, Select, SelectChangeEvent } from '@mui/material';
import { ModalProps } from '@mui/material/Modal/Modal';

import { Screens } from '../../screens/types';
import { ColorThemeObject } from '../../screens/newGameFiber/initials';
import { CurrentGameModes, useGameSaves } from '../../helpers';

import { useStyles } from './styles';

export interface SettingsProps<ThemesKeys extends string> extends ModalProps {
    customHandles: SettingCustomHandlesProps<ThemesKeys>;
    passedValues: SettingPassedValuesProps<ThemesKeys>;
}

export interface SettingCustomHandlesProps<ThemesKeys extends string> {
    onClose: (isOpen: boolean) => void;
    setAmbientLightIntensity: (intensity: number) => void;
    setSelectedScreen: (scree: Screens) => void;
    setCameraZoom: (cameraZoom: number) => void;
    setSelectedTheme: (selectedTheme: ThemesKeys) => void;
};

export interface SettingPassedValuesProps<ThemesKeys> {
    intensity: number;
    cameraZoom: number;
    selectedTheme: ThemesKeys;
    availableThemes: Array<ColorThemeObject<ThemesKeys>>;
}

const Settings = <ThemeKeys extends string>({ customHandles, passedValues, ...rest }: SettingsProps<ThemeKeys>) => {
    const styles = useStyles();
    const { save } = useGameSaves();

    const handleChange = (event: SelectChangeEvent) => {
        customHandles.setSelectedTheme(event.target.value as ThemeKeys);
    };

    const handleCloseModal = () => {
        customHandles.onClose(false);
    };

    const handleSave = () => {
        let gameSaved = false;
        try {
            save({
                saveName: 'name',
                metaGameData: {
                    shardCount: 0,
                },
                currentGameData: {
                    mode: CurrentGameModes.match3,
                    galaxyMapPosition: 'position',
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
                </div>
            </div>
            <div onClick={handleSave}>
                save game
            </div>
            <div onClick={handleCloseModal}>
                close modal
            </div>
        </div>
    </Modal>);
};

export default Settings;
