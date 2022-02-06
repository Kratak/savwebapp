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
    const [scoreCounters, setScoreCounters] = useState<Array<{ key: ColorKeys; value: number }>>([]);
    const [readyForCounting, setReadyForCounting] = useState<boolean>(false);


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
        const selectedColorKey = initials.availableColorThemes[selectedTheme] as Array<ColorKeys>;
        const newTiles = getTilesGrid<ColorKeys>({
            columns: 7,
            rows: 9,
            colors: selectedColorKey,
        });
        setTiles(newTiles);
        setScoreCounters(selectedColorKey.map(item => ({ key: item, value: 0 })));
    }, [selectedTheme]);

    useEffect(() => {
        if (selectedTiles[0].length > 1 && readyForCounting) {
            // NOTE: color are reversed in purpose, to refactor later [Kratak]
            const firstItem: SelectedTilesData<ColorKeys> = {
                ...selectedTiles[0][0],
                color: selectedTiles[0][1].color,
            };
            const secondItem: SelectedTilesData<ColorKeys> = {
                ...selectedTiles[0][1],
                color: selectedTiles[0][0].color,
            };

            let addScore: number = 0;
            let revert = true;
            let colorToAdd: ColorKeys | null = null;

            const firstFilteredColumnToCheck = tiles[firstItem.gridPosition.columns].filter(item => item.color === firstItem.color);
            const secondFilteredColumnToCheck = tiles[secondItem.gridPosition.columns].filter(item => item.color === secondItem.color);
            const firstFilteredRowToCheck = tiles.flat().filter(item => item.gridPosition.rows === firstItem.gridPosition.rows && item.color === firstItem.color);
            const secondFilteredRowToCheck = tiles.flat().filter(item => item.gridPosition.rows === secondItem.gridPosition.rows && item.color === secondItem.color);

            const firstColumnsValid = firstFilteredColumnToCheck.length > 2;
            const firstRowsValid = firstFilteredRowToCheck.length > 2;
            const secondColumnsValid = secondFilteredColumnToCheck.length > 2;
            const secondRowsValid = secondFilteredRowToCheck.length > 2;

            if (firstColumnsValid) {
                let tempArr: Array<TilesGridObject<ColorKeys>> = [];

                firstFilteredColumnToCheck.forEach((item, index) => {
                    if (index < firstFilteredColumnToCheck.length - 1) {
                        if ((firstFilteredColumnToCheck[index + 1].gridPosition.rows - item.gridPosition.rows) === 1) {
                            tempArr = [...tempArr, item];
                        } else {
                            if (tempArr.length < 2) {
                                tempArr = [];
                            }
                        }
                    } else {
                        if ((item.gridPosition.rows - firstFilteredColumnToCheck[index - 1].gridPosition.rows) === 1) {
                            tempArr = [...tempArr, item];
                        } else {
                            if (tempArr.length < 2) {
                                tempArr = [];
                            }
                        }
                    }
                });
                if (tempArr.length > 2) {
                    addScore = tempArr.length;
                    colorToAdd = tempArr[0].color;
                    revert = false;
                    tempArr = [];
                }
            }
            if (firstRowsValid) {
                let tempArr: Array<TilesGridObject<ColorKeys>> = [];

                firstFilteredRowToCheck.forEach((item, index) => {
                    if (index < firstFilteredRowToCheck.length - 1) {
                        if ((firstFilteredRowToCheck[index + 1].gridPosition.columns - item.gridPosition.columns) === 1) {
                            tempArr = [...tempArr, item];
                        } else {
                            if (tempArr.length < 2) {
                                tempArr = [];
                            }
                        }
                    } else {
                        if ((item.gridPosition.columns - firstFilteredRowToCheck[index - 1].gridPosition.columns) === 1) {
                            tempArr = [...tempArr, item];
                        } else {
                            if (tempArr.length < 2) {
                                tempArr = [];
                            }
                        }
                    }
                });
                if (tempArr.length > 2) {
                    addScore = tempArr.length;
                    colorToAdd = tempArr[0].color;
                    revert = false;
                    tempArr = [];
                }

            }
            if (secondColumnsValid) {
                let tempArr: Array<TilesGridObject<ColorKeys>> = [];

                secondFilteredColumnToCheck.forEach((item, index) => {
                    if (index < secondFilteredColumnToCheck.length - 1) {
                        if ((secondFilteredColumnToCheck[index + 1].gridPosition.rows - item.gridPosition.rows) === 1) {
                            tempArr = [...tempArr, item];
                        } else {
                            if (tempArr.length < 2) {
                                tempArr = [];
                            }
                        }
                    } else {
                        if ((item.gridPosition.rows - secondFilteredColumnToCheck[index - 1].gridPosition.rows) === 1) {
                            tempArr = [...tempArr, item];
                        } else {
                            if (tempArr.length < 2) {
                                tempArr = [];
                            }
                        }
                    }
                });
                if (tempArr.length > 2) {
                    addScore = tempArr.length;
                    colorToAdd = tempArr[0].color;
                    revert = false;
                    tempArr = [];
                }

            }
            if (secondRowsValid) {
                let tempArr: Array<TilesGridObject<ColorKeys>> = [];

                secondFilteredRowToCheck.forEach((item, index) => {
                    if (index < secondFilteredRowToCheck.length - 1) {
                        if ((secondFilteredRowToCheck[index + 1].gridPosition.columns - item.gridPosition.columns) === 1) {
                            tempArr = [...tempArr, item];
                        } else {
                            if (tempArr.length < 2) {
                                tempArr = [];
                            }
                        }
                    } else {
                        if ((item.gridPosition.columns - secondFilteredRowToCheck[index - 1].gridPosition.columns) === 1) {
                            tempArr = [...tempArr, item];
                        } else {
                            if (tempArr.length < 2) {
                                tempArr = [];
                            }
                        }
                    }
                });
                if (tempArr.length > 2) {
                    addScore = tempArr.length;
                    colorToAdd = tempArr[0].color;
                    revert = false;
                    tempArr = [];
                }
            }


            if (!revert && addScore) {
                setScoreCounters(scoreCounters.map(item => {
                    if (item.key === colorToAdd) {
                        return {
                            ...item,
                            value: item.value + addScore,
                        };

                    }
                    return item;
                }));
                colorToAdd = null;
                revert = true;
                addScore = 0;

            }

            selectedTiles[1]([]);
            setReadyForCounting(false);
        }

    }, [scoreCounters, tiles, selectedTiles[0], readyForCounting]);

    return {
        settings: {
            customHandles: handlers,
            passedValues: passedValues,
            open: openSetting,
        },
        handlers: {
            setOpenSetting,
            setReadyForCounting,
            setTiles,
            deleteRow,
        },
        data: {
            displayData: {
                scoreCounters,
            },
            classes: styles,
            tiles,
            selectedTiles,
        },
    };
};
