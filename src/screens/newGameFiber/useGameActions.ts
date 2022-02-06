import { useEffect, useState } from 'react';

import { SettingCustomHandlesProps, SettingPassedValuesProps } from '../../UIcomponents/settings/settings';
import { getTilesGrid, TilesGridObject } from '../../gameModes/simple/helpers';

import { ScreenSelectorProps } from '../types';
import { AvailableThemesKeys, initials } from './initials';
import { useStyles } from './styles';
import { SelectedTilesData, UseGameActionsReturn } from './types';

export const UseGameActions = <ColorKeys extends string>(props: ScreenSelectorProps): UseGameActionsReturn<ColorKeys> => {
    const styles = useStyles();
    const [openSetting, setOpenSetting] = useState(false);
    const selectedTiles = useState<Array<SelectedTilesData<ColorKeys>>>([]);
    const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
    const [cameraZoom, setCameraZoom] = useState(initials.camera.z);
    const [tiles, setTiles] = useState<Array<Array<TilesGridObject<ColorKeys>>>>([]);
    const [selectedTheme, setSelectedTheme] = useState<AvailableThemesKeys>(initials.colorThemes[0].value);
    const [scoreCounter, setScoreCounter] = useState<number>(0);


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
        const newTiles = getTilesGrid<ColorKeys>({
            columns: 7,
            rows: 9,
            colors: initials.availableColorThemes[selectedTheme] as Array<ColorKeys>,
        });
        setTiles(newTiles);
    }, [selectedTheme]);

    useEffect(() => {
        if (selectedTiles[0].length > 1) {
            // todo single swap action
            // console.log('ddsa')
        }


    }, [selectedTiles[0]]);

    return {
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
        data: {
            displayData: {
                scoreCounter,
            },
            classes: styles,
            tiles,
            selectedTiles,
        },
    };
};
