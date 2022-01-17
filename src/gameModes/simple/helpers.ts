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


export interface TilesGridObject<T> {
    position: Vector3;
    color: T;
    boxId: string;
}

interface GetTilesGridProps<T> {
    rows: number;
    columns: number;
    colorsKeys: Array<T>;
}


export const getTilesGrid = <T extends string>(given: GetTilesGridProps<T>): Array<TilesGridObject<T>> => {
    let tiles: Array<TilesGridObject<T>> = [];
    const halfColumnsCount = Math.floor(given.columns / 2);
    const halfRowsCount = Math.floor(given.rows / 2);

    console.log(halfColumnsCount, halfRowsCount);

    for (let rows = halfRowsCount * -1; rows < halfRowsCount; rows++) {
        for (let columns = halfColumnsCount * -1; columns < halfColumnsCount; columns++) {
            const color = given.colorsKeys[getRandomInt(given.colorsKeys.length)];
            tiles = [...tiles, {
                color,
                position: [columns, rows, 0],
                boxId: `C${columns}-R${rows}-${color}`
            }];
        }
    }

    return tiles;
};
