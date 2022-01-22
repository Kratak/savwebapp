import { useEffect, useState } from 'react';

import { SettingCustomHandlesProps, SettingPassedValuesProps } from '../../UIcomponents/settings/settings';
import { SimpleGameModeColorsKeys } from '../../gameModes/simple/colors';
import { getRandomInt, TilesGridObject } from '../../gameModes/simple/helpers';

import { ScreenSelectorProps } from '../types';
import { initials } from './initials';
import { useStyles } from './styles';

const colorsKeys: Array<SimpleGameModeColorsKeys> = Object.keys(SimpleGameModeColorsKeys) as Array<SimpleGameModeColorsKeys>;

const newTilesV2 = <T extends string>(given: { colors: Array<T>; columns: number; rows: number; }) => {
    let depTiles: Array<Array<TilesGridObject<T>>> = [];

    for (let columns = 0; columns < given.columns; columns++) {
        let getObj = depTiles[columns] || [];
        for (let rows = 0; rows < given.rows; rows++) {
            const color = given.colors[getRandomInt(given.colors.length)];
            const columnNumber = columns - Math.floor(given.columns / 2);
            const rowNumber = rows - Math.floor(given.rows / 2);

            getObj = [...getObj, {
                color,
                position: [columnNumber, rowNumber, 0],
                boxId: `ID_${columnNumber}C_${rowNumber}R_${color}`,
            }];
        }
        depTiles = [...depTiles, getObj];
    }

    console.log('depTiles.filled', depTiles);
    return depTiles;
};

export const UseGameActions = (props: ScreenSelectorProps) => {
    const styles = useStyles();
    const [openSetting, setOpenSetting] = useState(false);
    const selectedTiles = useState<Array<string>>([]);
    const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
    const [cameraZoom, setCameraZoom] = useState(initials.camera.z);
    const [tiles, setTiles] = useState<Array<Array<TilesGridObject<SimpleGameModeColorsKeys>>>>([]);

    useEffect(() => {
        const newTiles = newTilesV2<SimpleGameModeColorsKeys>({
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
