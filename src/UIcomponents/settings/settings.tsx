import { Modal } from '@mui/material';
import { ModalProps } from '@mui/material/Modal/Modal';
import { useStyles } from './styles';
import { Screens } from '../../screens/types';
import React from 'react';

interface SettingsProps extends ModalProps {
    customHandles: SettingCustomHandlesProps;
    passedValues: SettingPassedValuesProps;
}

export interface SettingCustomHandlesProps {
    onClose: (isOpen: boolean) => void;
    setAmbientLightIntensity: (intensity: number) => void;
    setSelectedScreen: (scree: Screens) => void;
    setCameraZoom: (cameraZoom: number) => void;
};

export interface SettingPassedValuesProps {
    intensity: number;
    cameraZoom: number;
}

const Settings = ({ customHandles, passedValues, ...rest }: SettingsProps) => {
    const styles = useStyles();

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
            </div>
            <div onClick={() => customHandles.onClose(false)}>
                close modal
            </div>
        </div>
    </Modal>);
};

export default Settings;
