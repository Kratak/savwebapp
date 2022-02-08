import React, { useState } from 'react';
import { MenuItem, Modal, Select, SelectChangeEvent } from '@mui/material';
import { ModalProps } from '@mui/material/Modal/Modal';

import { Screens } from '../../screens/types';
import { ColorThemeObject } from '../../screens/newGameFiber/initials';

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
    setWireframeOn: (toggle: boolean) => void;
};

export interface SettingPassedValuesProps<ThemesKeys> {
    intensity: number;
    cameraZoom: number;
    selectedTheme: ThemesKeys;
    availableThemes: Array<ColorThemeObject<ThemesKeys>>;
    wireframeOn: boolean;
}

const Settings = <ThemeKeys extends string>({ customHandles, passedValues, ...rest }: SettingsProps<ThemeKeys>) => {
    const [devSettingAllowed , setDevSettingAllowed] = useState<boolean>(true);
    const styles = useStyles();

    const handleChange = (event: SelectChangeEvent) => {
        customHandles.setSelectedTheme(event.target.value as ThemeKeys);
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
            <div onClick={() => customHandles.onClose(false)}>
                close modal
            </div>
        </div>
    </Modal>);
};

export default Settings;
