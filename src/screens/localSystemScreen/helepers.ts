import { SpacePalletColors } from '../../constans/tileColors';
import { calculationsHelpers } from '../../helpers';
import { Screens, ScreenSelectorProps } from '../types';

export enum SystemTileKeys {
    startSystemTile = 'startSystemTile',
    endSystemTile = 'endSystemTile',
    smalAsteroidTile = 'smalAsteroidTile',
    mediumAsteroidTile = 'mediumAsteroidTile',
    normalFightEvent = 'normalFightEvent',
    bossFightEvent = 'bossFightEvent',
    normalAnomalyEvent = 'normalAnomalyEvent',
    normalSpace = 'normalSpace'
}

export interface SystemTileData {
    name: SystemTileKeys;
    description: string;
    size: number;
    radius: [number, number, number, number, number, number];
    color: string;
    available: boolean;
    specialConditions?: {
        action?: (props: ScreenSelectorProps) => void;
        howMany?: number;
        farFrom?: Array<{ name: SystemTileKeys, minimal: number, maximal?: number }>;
    };
}

export const firstSystemTiles: { [key in SystemTileKeys]: SystemTileData } = {
    startSystemTile: {
        name: SystemTileKeys.startSystemTile,
        description: '',
        size: 1,
        radius: [0, 0, 0, 0, 0, 0],
        available: true,
        color: SpacePalletColors.YellowSun,
        specialConditions: {
            howMany: 1,
            farFrom: [
                { name: SystemTileKeys.endSystemTile, minimal: 10 },
            ],
        },
    },
    endSystemTile: {
        name: SystemTileKeys.endSystemTile,
        description: '',
        size: 1,
        available: true,
        radius: [0, 0, 0, 0, 0, 0],
        color: SpacePalletColors.Gravitation,
        specialConditions: {
            action: (screenSelectorProps) => {
                alert('you won');
                screenSelectorProps.setGlobalDataProvider({
                    ...screenSelectorProps.globalData,
                    currentScreen: Screens.Credits,
                });
            },
            howMany: 1,
            farFrom: [
                { name: SystemTileKeys.startSystemTile, minimal: 10, maximal: 20 },
            ],
        },
    },
    normalSpace: {
        name: SystemTileKeys.normalSpace,
        description: '',
        size: 1,
        available: true,
        color: SpacePalletColors.Void,
        radius: [0, 0, 0, 0, 0, 0],
    },
    normalAnomalyEvent: {
        name: SystemTileKeys.normalAnomalyEvent,
        description: '',
        size: 1,
        available: true,
        color: SpacePalletColors.Regeneration,
        radius: [0, 0, 0, 0, 0, 0],
        specialConditions: {
            action: () => alert('anomaly'),
        },
    },
    smalAsteroidTile: {
        name: SystemTileKeys.smalAsteroidTile,
        description: '',
        size: 1,
        available: false,
        color: SpacePalletColors.WordleGrey,
        radius: [0, 0, 0, 0, 0, 0],
    },
    mediumAsteroidTile: {
        name: SystemTileKeys.mediumAsteroidTile,
        description: '',
        size: 1,
        available: false,
        color: SpacePalletColors.Corruption,
        radius: [0, 1, 1, 0, 1, 0],
    },
    normalFightEvent: {
        name: SystemTileKeys.normalFightEvent,
        description: '',
        size: 1,
        available: true,
        color: SpacePalletColors.RedDwarf,
        radius: [1, 1, 1, 1, 1, 1],
        specialConditions: {
            action: (screenSelectorProps) => {
                alert('prepare for fight');
                screenSelectorProps.setGlobalDataProvider({
                    ...screenSelectorProps.globalData,
                    currentScreen: Screens.InGameSimpleBattlefield,
                });
            },
            farFrom: [{ name: SystemTileKeys.startSystemTile, minimal: 3 }],
        },
    },
    bossFightEvent: {
        name: SystemTileKeys.bossFightEvent,
        description: '',
        size: 1,
        available: true,
        color: SpacePalletColors.RedDwarf,
        radius: [2, 2, 2, 2, 2, 2],
        specialConditions: {
            action: (screenSelectorProps) => {
                alert('prepare for boss fight');
                screenSelectorProps.setGlobalDataProvider({
                    ...screenSelectorProps.globalData,
                    currentScreen: Screens.InGameSimpleBattlefield,
                });
            },
            farFrom: [{ name: SystemTileKeys.startSystemTile, minimal: 1, maximal: 1 }],
        },
    },
};

export interface HexPositionParameters {
    Y: number;
    XL: number;
    XR: number;
    X: number;
    isOdd: boolean;
}

export interface FirstSystemGridItem extends SystemTileData {
    tileId: string;
    hexPosition: HexPositionParameters;
}

function shuffle(array: Array<any>) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


const tilesSet001 = (totalNumer: number): Array<SystemTileData> => {
    let arr = [];
    for (let step = 0; step < 10; step++) {
        if (step === 1) {
            arr.push(...[firstSystemTiles.bossFightEvent, firstSystemTiles.startSystemTile, firstSystemTiles.endSystemTile]);
        }
        if (step < 5) {
            arr.push(...[firstSystemTiles.normalFightEvent]);
        }
        arr.push(...[firstSystemTiles.normalAnomalyEvent, firstSystemTiles.smalAsteroidTile]);
    }

    for (let step = 0; step < totalNumer; step++) {
        arr.push(...[firstSystemTiles.normalSpace]);
    }
    arr.splice(totalNumer);
    arr = shuffle(arr);
    return arr;
};

const tileSet002 = (): Array<SystemTileData> => {
    const {
        normalSpace,
        startSystemTile,
        endSystemTile,
        smalAsteroidTile,
        normalAnomalyEvent,
        bossFightEvent,
        normalFightEvent,
    } = firstSystemTiles;
    return [
        normalAnomalyEvent, normalFightEvent, normalSpace, normalSpace, normalSpace, bossFightEvent, endSystemTile, bossFightEvent,
        smalAsteroidTile, normalSpace, normalSpace, normalSpace, normalSpace, smalAsteroidTile, bossFightEvent, normalSpace,
        smalAsteroidTile, smalAsteroidTile, normalSpace, normalFightEvent, smalAsteroidTile, normalAnomalyEvent, smalAsteroidTile, normalSpace,
        normalSpace, normalSpace, smalAsteroidTile, normalSpace, smalAsteroidTile, smalAsteroidTile, normalFightEvent, smalAsteroidTile,
        normalFightEvent, smalAsteroidTile, normalSpace, normalSpace, normalAnomalyEvent, smalAsteroidTile, normalSpace, normalSpace,
        normalSpace, normalSpace, smalAsteroidTile, smalAsteroidTile, smalAsteroidTile, normalFightEvent, normalSpace, normalSpace,
        smalAsteroidTile, normalSpace, smalAsteroidTile, normalAnomalyEvent, normalSpace, smalAsteroidTile, smalAsteroidTile, normalSpace,
        normalSpace, startSystemTile, normalSpace, normalSpace, normalSpace, normalSpace, normalFightEvent, normalAnomalyEvent,
    ];
};

const { isOdd } = calculationsHelpers;
export const getFirstSystemRandomGrid = (given: {
    rows: number,
    columns: number,
    selectedTiles: Array<SystemTileData>,
    gridId: string

}): { data: Array<Array<FirstSystemGridItem>>; gridId: string } => {

    // const test001Memo = tilesSet001(given.columns * given.rows);
    const test002Memo = tileSet002();
    let depTiles: Array<Array<FirstSystemGridItem>> = [];

    for (let columns = 0; columns < given.columns; columns++) {
        let getObj: Array<FirstSystemGridItem> = depTiles[columns] || [];
        for (let rows = 0; rows < given.rows; rows++) {
            // let color = given.colors[getRandomInt(given.colors.length)];
            const columnNumber = columns - Math.floor(given.columns / 2);
            const rowNumber = rows - Math.floor(given.rows / 2);
            // if (columns > 1 && depTiles[columns - 1][rows].color === color && depTiles[columns - 2][rows].color === color) {
            //     const availableColor = given.colors.filter(item => item !== color);
            //     color = availableColor[getRandomInt(availableColor.length - 1)];
            // }
            // if (rows > 1 && getObj[rows - 1].color === color && getObj[rows - 2].color === color) {
            //     const availableColor = given.colors.filter(item => item !== color);
            //     color = availableColor[getRandomInt(availableColor.length - 1)];
            //
            // }
            let XL = 0;
            let XR = 0;

            if (!isOdd(rows)) {
                if (columns + (columns % rows) >= rows) {
                    XL = rows;
                    XR = given.rows - rows - 1;
                } else {
                    XL = 2 * columns;
                }

                if (columns + (columns % (given.rows - rows)) >= (given.rows - rows)) {
                    XR = given.rows - rows - 1;
                } else {
                    XR = 2 * columns;
                }


            }
            if (isOdd(rows)) {
                if (columns + (columns % rows) + 1 >= rows) {
                    XL = rows;
                    XR = given.rows - rows - 1;
                } else {
                    XL = (2 * columns) + 1;
                }

                if (columns + (columns % (given.rows - rows) + 1) >= (given.rows - rows)) {
                    XR = given.rows - rows - 1;
                } else {
                    XR = 2 * columns + 1;
                }

            }

            if (rows === 0) {
                XL = 0;
                XR = given.rows - 1;

                if (given.rows / 2 > columns) {
                    XR = 2 * columns;
                }
            }

            if (rows === given.rows - 1) {
                XR = 0;
            }

            let innerObject = {
                ...test002Memo[(given.columns * columns) + rows],
                hexPosition: {
                    Y: columns,
                    XL,
                    XR,
                    X: rows,
                    isOdd: !isOdd(rows),
                },
                tileId: `ID_${columnNumber}C_${rowNumber}R_${firstSystemTiles.normalSpace.name}`,
            };

            getObj = [...getObj, innerObject];
        }
        depTiles = [...depTiles, getObj];
    }

    return { data: depTiles, gridId: given.gridId };
};
