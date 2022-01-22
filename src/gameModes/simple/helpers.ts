import { Vector3 } from '@react-three/fiber/dist/declarations/src/three-types';

export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
};


interface GetRandomArrayOfColorsProps {
    howMuch: number,
    availableColors: Array<string>
}

export const getRandomArrayOfColors = (given: GetRandomArrayOfColorsProps): Array<string> => {
    let arr: Array<string> = [];
    for (let step = 0; step < given.howMuch; step++) {
        arr = [...arr, given.availableColors[getRandomInt(given.availableColors.length)]];
    }
    return arr;
};


export interface TilesGridObject<T extends string> {
    position: Vector3;
    color: T;
    boxId: string;
}

interface GetTilesGridProps<T extends string> {
    rows: number;
    columns: number;
    colors: Array<T>;
}


export const getTilesGrid = <T extends string>(given: GetTilesGridProps<T>) => {
    let depTiles: Array<Array<TilesGridObject<T>>> = [];

    for (let columns = 0; columns < given.columns; columns++) {
        let getObj = depTiles[columns] || [];
        for (let rows = 0; rows < given.rows; rows++) {
            let color = given.colors[getRandomInt(given.colors.length)];
            const columnNumber = columns - Math.floor(given.columns / 2);
            const rowNumber = rows - Math.floor(given.rows / 2);
            if (columns > 1 && depTiles[columns - 1][rows].color === color && depTiles[columns - 2][rows].color === color) {
                const availableColor = given.colors.filter(item => item !== color);
                color = availableColor[getRandomInt(availableColor.length - 1)];
            }
            if (rows > 1 && getObj[rows - 1].color === color && getObj[rows - 2].color === color) {
                const availableColor = given.colors.filter(item => item !== color);
                color = availableColor[getRandomInt(availableColor.length - 1)];

            }
            getObj = [...getObj, {
                color,
                position: [columnNumber, rowNumber, 0],
                boxId: `ID_${columnNumber}C_${rowNumber}R_${color}`,
            }];
        }
        depTiles = [...depTiles, getObj];
    }

    return depTiles;
};
