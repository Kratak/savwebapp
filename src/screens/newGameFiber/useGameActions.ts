import { useEffect, useState } from 'react';

import { SettingCustomHandlesProps, SettingPassedValuesProps } from '../../UIcomponents/settings/settings';
import { SimpleGameModeColorsKeys } from '../../gameModes/simple/colors';
import { getTilesGrid, TilesGridObject } from '../../gameModes/simple/helpers';

import { ScreenSelectorProps } from '../types';
import { initials } from './initials';
import { useStyles } from './styles';

const colorsKeys: Array<SimpleGameModeColorsKeys> = Object.keys(SimpleGameModeColorsKeys) as Array<SimpleGameModeColorsKeys>;

export const UseGameActions = (props: ScreenSelectorProps) => {
    const styles = useStyles();
    const [openSetting, setOpenSetting] = useState(false);
    const selectedTiles = useState<Array<string>>([]);
    const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
    const [cameraZoom, setCameraZoom] = useState(initials.camera.z);
    const [tiles, setTiles] = useState<Array<Array<TilesGridObject<SimpleGameModeColorsKeys>>>>([]);

    useEffect(() => {
        const newTiles = getTilesGrid<SimpleGameModeColorsKeys>({
            columns: 7,
            rows: 9,
            colors: colorsKeys,
        });

        setTiles(newTiles);
    }, []);

    const handlers: SettingCustomHandlesProps = {
        onClose: (isOpen) => setOpenSetting(isOpen),
        setCameraZoom: (givenCameraZoom) => setCameraZoom(givenCameraZoom),
        setSelectedScreen: (scree) => props.setSelectedScreen(scree),
        setAmbientLightIntensity: (givenIntensity) => setAmbientLightIntensity(givenIntensity),
    };

    const passedValues: SettingPassedValuesProps = {
        intensity: ambientLightIntensity,
        cameraZoom,
    };


    return {
        classes: styles,
        settings: {
            customHandles: handlers,
            passedValues: passedValues,
            open: openSetting,
        },
        handlers: {
            setOpenSetting,
        },
        tiles,
        selectedTiles,
    };
};
