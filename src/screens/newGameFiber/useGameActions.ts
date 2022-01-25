import { useEffect, useState } from 'react';

import { SettingCustomHandlesProps, SettingPassedValuesProps } from '../../UIcomponents/settings/settings';
import { SimpleGameModeColorsKeys } from '../../gameModes/simple/colors';
import { getTilesGrid, TilesGridObject } from '../../gameModes/simple/helpers';

import { ScreenSelectorProps } from '../types';
import { AvailableThemesKeys, initials } from './initials';
import { useStyles } from './styles';
import { UseGameActionsReturn } from './types';

export const UseGameActions = (props: ScreenSelectorProps): UseGameActionsReturn => {
    const styles = useStyles();
    const [openSetting, setOpenSetting] = useState(false);
    const selectedTiles = useState<Array<string>>([]);
    const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
    const [cameraZoom, setCameraZoom] = useState(initials.camera.z);
    const [tiles, setTiles] = useState<Array<Array<TilesGridObject<SimpleGameModeColorsKeys>>>>([]);
    const [selectedTheme, setSelectedTheme] = useState<AvailableThemesKeys>(initials.colorThemes[0].value);


    const passedValues: SettingPassedValuesProps<AvailableThemesKeys> = {
        intensity: ambientLightIntensity,
        cameraZoom,
        selectedTheme,
        availableThemes: initials.colorThemes,
    };

    const handlers: SettingCustomHandlesProps<AvailableThemesKeys> = {
        onClose: (isOpen) => setOpenSetting(isOpen),
        setCameraZoom: (givenCameraZoom) => setCameraZoom(givenCameraZoom),
        setSelectedScreen: (scree) => props.setSelectedScreen(scree),
        setAmbientLightIntensity: (givenIntensity) => setAmbientLightIntensity(givenIntensity),
        setSelectedTheme: (theme) => setSelectedTheme(theme),
    };

    const deleteRow = (toDelete: { passedColumnIndex?: number; passedRowsIndex?: number; }): void => {
        setTiles(tiles.map((column, originColumnIndex) => {
            let columnIndex = originColumnIndex;
            if (toDelete.passedColumnIndex) {
                columnIndex = toDelete.passedColumnIndex;
            }
            return column.map((row, originRowIndex) => {
                let newRow = row;
                let rowIndex = originRowIndex;
                if (toDelete.passedRowsIndex) {
                    rowIndex = toDelete.passedRowsIndex;
                }

                if (typeof toDelete.passedRowsIndex !== 'undefined' || typeof toDelete.passedColumnIndex !== 'undefined') {
                    if (columnIndex === originColumnIndex && rowIndex === originRowIndex) {
                        newRow = {
                            ...row,
                            renderTile: false,
                        };
                    }
                }

                if (typeof toDelete.passedRowsIndex !== 'undefined' && typeof toDelete.passedColumnIndex !== 'undefined') {
                    if (columnIndex === originColumnIndex || rowIndex === originRowIndex) {
                        newRow = {
                            ...row,
                            renderTile: false,
                        };
                    }
                }
                return newRow;
            });
        }));
    };

    useEffect(() => {
        const newTiles = getTilesGrid<SimpleGameModeColorsKeys>({
            columns: 7,
            rows: 9,
            colors: initials.availableColorThemes[selectedTheme],
        });

        setTiles(newTiles);
    }, [selectedTheme]);

    return {
        classes: styles,
        settings: {
            customHandles: handlers,
            passedValues: passedValues,
            open: openSetting,
        },
        handlers: {
            setOpenSetting,
            setTiles,
            deleteRow,
        },
        tiles,
        selectedTiles,
    };
};
