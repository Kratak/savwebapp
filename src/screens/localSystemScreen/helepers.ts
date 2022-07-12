import { SpacePalletColors } from '../../constans/tileColors';

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
    specialConditions?: {
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
        radius: [0, 0, 0, 0, 0, 0],
        color: SpacePalletColors.Gravitation,
        specialConditions: {
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
        color: SpacePalletColors.Void,
        radius: [0, 0, 0, 0, 0, 0],
    },
    normalAnomalyEvent: {
        name: SystemTileKeys.normalAnomalyEvent,
        description: '',
        size: 1,
        color: SpacePalletColors.Regeneration,
        radius: [0, 0, 0, 0, 0, 0],
    },
    smalAsteroidTile: {
        name: SystemTileKeys.smalAsteroidTile,
        description: '',
        size: 1,
        color: SpacePalletColors.Corruption,
        radius: [0, 0, 0, 0, 0, 0],
    },
    mediumAsteroidTile: {
        name: SystemTileKeys.mediumAsteroidTile,
        description: '',
        size: 1,
        color: SpacePalletColors.Corruption,
        radius: [0, 1, 1, 0, 1, 0],
    },
    normalFightEvent: {
        name: SystemTileKeys.normalFightEvent,
        description: '',
        size: 1,
        color: SpacePalletColors.RedDwarf,
        radius: [1, 1, 1, 1, 1, 1],
        specialConditions: {
            farFrom: [{ name: SystemTileKeys.startSystemTile, minimal: 3 }],
        },
    },
    bossFightEvent: {
        name: SystemTileKeys.bossFightEvent,
        description: '',
        size: 1,
        color: SpacePalletColors.RedDwarf,
        radius: [2, 2, 2, 2, 2, 2],
        specialConditions: {
            farFrom: [{ name: SystemTileKeys.startSystemTile, minimal: 1, maximal: 1 }],
        },
    },
};

interface FirstSystemGridItem extends SystemTileData {
    tileId: string;
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

    return shuffle(arr);
};

export const getFirstSystemRandomGrid = (given: {
    rows: number,
    columns: number,
    selectedTiles: Array<SystemTileData>

}) => {

    const test001Memo = tilesSet001(given.columns * given.rows);
    let depTiles: Array<Array<FirstSystemGridItem>> = [];

    for (let columns = 0; columns < given.columns; columns++) {
        let getObj = depTiles[columns] || [];
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

            let innerObject = {
                ...test001Memo[(given.columns * columns) + rows],
                tileId: `ID_${columnNumber}C_${rowNumber}R_${firstSystemTiles.normalSpace.name}`,
            };

            getObj = [...getObj, innerObject];
        }
        depTiles = [...depTiles, getObj];
    }

    return depTiles;
};
