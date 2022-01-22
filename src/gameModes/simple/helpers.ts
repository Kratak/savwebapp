import { Vector3 } from '@react-three/fiber/dist/declarations/src/three-types';

import { calculationsHelpers } from '../../genericHelpers';

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
    colorsKeys: Array<T>;
}


export const getTilesGrid = <T extends string>(given: GetTilesGridProps<T>): Array<TilesGridObject<T>> => {
    let previousRowColor: Array<string> = [];
    let tiles: Array<TilesGridObject<T>> = [];
    const rowStartIndex = Math.floor(given.rows / 2);
    const columnStartIndex = Math.floor(given.columns / 2);

    const halfRowsCount = rowStartIndex + Number(calculationsHelpers.isOdd(given.rows));
    const halfColumnsCount = columnStartIndex + Number(calculationsHelpers.isOdd(given.columns));

    for (let rows = rowStartIndex * -1; rows < halfRowsCount; rows++) {
        for (let columns = columnStartIndex * -1; columns < halfColumnsCount; columns++) {
            const color = given.colorsKeys[getRandomInt(given.colorsKeys.length)];

            let newTile: TilesGridObject<T> = {
                color,
                position: [columns, rows, 0],
                boxId: `ID_${columns}C_${rows}R_${color}`,
            };
            if (previousRowColor.filter(item => item === newTile.color).length === 2) {
                const newGivenColor = given.colorsKeys.filter(item => item !== newTile.color);
                newTile = {
                    ...newTile,
                    color: newGivenColor[getRandomInt(newGivenColor.length)],
                };
                previousRowColor = [];
            }

            tiles = [...tiles, newTile];
            previousRowColor = tiles.length > 0 ? [tiles[tiles.length - 1].color, ...previousRowColor].slice(0, 2) : previousRowColor;
        }

    }


    return tiles;
};
