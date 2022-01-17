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


export interface TilesGridObject {
    position: Vector3;
    color: string;
    boxId: string;
}

interface GetTilesGridProps {
    rows: number;
    columns: number;
    availableColors: Array<string>;
}


export const getTilesGrid = (given: GetTilesGridProps): Array<TilesGridObject> => {
    let tiles: Array<TilesGridObject> = [];
    const halfColumnsCount = Math.floor(given.columns / 2);
    const halfRowsCount = Math.floor(given.rows / 2);

    console.log(halfColumnsCount, halfRowsCount);

    for (let rows = halfRowsCount * -1; rows < halfRowsCount; rows++) {
        for (let columns = halfColumnsCount * -1; columns < halfColumnsCount; columns++) {
            const color = given.availableColors[getRandomInt(given.availableColors.length)];
            tiles = [...tiles, {
                color,
                position: [columns, rows, 0],
                boxId: `C${columns}-R${rows}-${color}`
            }];
        }
    }

    return tiles;
};
