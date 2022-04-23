import { useEffect, useState } from 'react';
import classnames from 'classnames';

import { SettingCustomHandlesProps, SettingPassedValuesProps } from '../../UIcomponents/settings/settings';
import { getTilesGrid, TilesGridObject } from '../../gameModes/simple/helpers';
import { useInGameScreenPush } from '../../helpers/useInGameScreenPush';

import { ScreenSelectorProps } from '../types';
import { AvailableThemesKeys, initials } from './initials';
import { NewGameFiberStylesKeys, useStyles } from './styles';
import { HandlerDeleteProps, SelectedTilesData, UseGameActionsReturn } from './types';

export const UseGameActions = <ColorKeys extends string>(props: ScreenSelectorProps): UseGameActionsReturn<ColorKeys> => {
    const { screenHandlers } = useInGameScreenPush(props);
    const baseStyles = useStyles();
    const [openSetting, setOpenSetting] = useState(false);
    const selectedTiles = useState<Array<SelectedTilesData<ColorKeys>>>([]);
    const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
    const [wireframeOn, setWireframeOn] = useState<boolean>(false);
    const [cameraZoom, setCameraZoom] = useState(initials.camera.z);
    const [tiles, setTiles] = useState<Array<Array<TilesGridObject<ColorKeys>>>>([]);
    const [selectedTheme, setSelectedTheme] = useState<AvailableThemesKeys>(initials.colorThemes[0].value);
    const [scoreCounters, setScoreCounters] = useState<Array<{ key: ColorKeys; value: number }>>([]);
    const [readyForCounting, setReadyForCounting] = useState<boolean>(false);


    const styles: { [key in NewGameFiberStylesKeys]: string } = {
        ...baseStyles,
        [NewGameFiberStylesKeys.title]: classnames(baseStyles.uiElementsWrapper,baseStyles.title),
        [NewGameFiberStylesKeys.uiWrapper]: classnames(baseStyles.uiElementsWrapper, baseStyles.uiWrapper),
        [NewGameFiberStylesKeys.counters]: `${baseStyles.counters} ${baseStyles.uiElementsWrapper}`
    };

    const passedValues: SettingPassedValuesProps<AvailableThemesKeys> = {
        intensity: ambientLightIntensity,
        cameraZoom,
        selectedTheme,
        availableThemes: initials.colorThemes,
        wireframeOn,
    };

    const settingsHandlers: SettingCustomHandlesProps<AvailableThemesKeys> = {
        onClose: (isOpen) => setOpenSetting(isOpen),
        setCameraZoom: (givenCameraZoom) => setCameraZoom(givenCameraZoom),
        setSelectedScreen: (scree) => screenHandlers.gotToSelectedScreen(scree),
        setAmbientLightIntensity: (givenIntensity) => setAmbientLightIntensity(givenIntensity),
        setSelectedTheme: (theme) => setSelectedTheme(theme),
        setWireframeOn: (toggle) => setWireframeOn(toggle),
    };

    const tilesToDelete = (toDelete: HandlerDeleteProps): void => {
        setTiles(tiles.map((column, originColumnIndex) => {
            let columnIndex = originColumnIndex;
            if (toDelete.column?.index) {
                columnIndex = toDelete.column?.index;
            }
            return column.map((row, originRowIndex) => {
                let newRow = row;
                let rowIndex = originRowIndex;
                if (toDelete.row?.index) {
                    rowIndex = toDelete.row?.index;
                }

                if (typeof toDelete.row?.index !== 'undefined' || typeof toDelete.column?.index !== 'undefined') {
                    if (columnIndex === originColumnIndex && rowIndex === originRowIndex) {
                        if (toDelete.column?.rows && toDelete.column.rows.length > 0) {
                            newRow = {
                                ...row,
                                renderTile: toDelete.column.rows.includes(originRowIndex) ? false : row.renderTile,
                            };

                        }

                        if (toDelete.row?.columns && toDelete.row?.columns.length > 0) {
                            newRow = {
                                ...row,
                                renderTile: toDelete.row.columns.includes(originColumnIndex) ? false : row.renderTile,
                            };

                        }

                        if (!toDelete.row?.columns && !toDelete.column?.rows) {
                            newRow = {
                                ...row,
                                renderTile: false,
                            };
                        }
                    }
                }

                if (typeof toDelete.row?.index !== 'undefined' && typeof toDelete.column?.index !== 'undefined') {
                    //TODO this part work with only one array passed, to investigate
                    if (columnIndex === originColumnIndex || rowIndex === originRowIndex) {
                        if (toDelete.column?.rows && toDelete.column.rows.length > 0) {
                            newRow = {
                                ...row,
                                renderTile: toDelete.column.rows.includes(originRowIndex) ? false : row.renderTile,
                            };


                        }
                        if (toDelete.row?.columns && toDelete.row?.columns.length > 0) {
                            newRow = {
                                ...row,
                                renderTile: toDelete.row.columns.includes(originColumnIndex) ? false : row.renderTile,
                            };
                        }


                    }
                    if (columnIndex === originColumnIndex || rowIndex === originRowIndex) {
                        if (!toDelete.row?.columns && !toDelete.column?.rows) {
                            newRow = {
                                ...row,
                                renderTile: false,
                            };
                        }
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

            let addScore = false;
            let revert = true;
            let colorsToAdd = scoreCounters.map(item => item);
            let toDelete: HandlerDeleteProps = {};

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
                    addScore = true;
                    colorsToAdd = colorsToAdd.map(item => {
                        if (item.key === tempArr[0].color) {
                            return {
                                key: tempArr[0].color,
                                value: item.value + tempArr.length,
                            };
                        }
                        return item;
                    });
                    toDelete = {
                        column: {
                            index: tempArr[0].gridPosition.columns,
                            rows: tempArr.map(item => item.gridPosition.rows),
                        },
                    };
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
                    addScore = true;
                    colorsToAdd = colorsToAdd.map(item => {
                        if (item.key === tempArr[0].color) {
                            return {
                                key: tempArr[0].color,
                                value: item.value + tempArr.length,
                            };
                        }
                        return item;
                    });
                    toDelete = {
                        row: {
                            index: tempArr[0].gridPosition.rows,
                            columns: tempArr.map(item => item.gridPosition.columns),
                        },
                    };
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
                    addScore = true;
                    colorsToAdd = colorsToAdd.map(item => {
                        if (item.key === tempArr[0].color) {
                            return {
                                key: tempArr[0].color,
                                value: item.value + tempArr.length,
                            };
                        }
                        return item;
                    });
                    toDelete = {
                        column: {
                            index: tempArr[0].gridPosition.columns,
                            rows: tempArr.map(item => item.gridPosition.rows),
                        },
                    };
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
                    addScore = true;
                    colorsToAdd = colorsToAdd.map(item => {
                        if (item.key === tempArr[0].color) {
                            return {
                                key: tempArr[0].color,
                                value: item.value + tempArr.length,
                            };
                        }
                        return item;
                    });
                    revert = false;
                    toDelete = {
                        row: {
                            index: tempArr[0].gridPosition.rows,
                            columns: tempArr.map(item => item.gridPosition.columns),
                        },
                    };
                    tempArr = [];
                }
            }


            if (!revert && addScore) {
                setScoreCounters(colorsToAdd);
                tilesToDelete(toDelete);
            }

            selectedTiles[1]([]);
            setReadyForCounting(false);
        }

    }, [scoreCounters, tiles, selectedTiles[0], readyForCounting]);

    return {
        settings: {
            settingsHandlers,
            passedValues: passedValues,
            open: openSetting,
            saveData: {
                scoreCounters
            }
        },
        handlers: {
            setOpenSetting,
            setReadyForCounting,
            setTiles,
            tilesToDelete,
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
