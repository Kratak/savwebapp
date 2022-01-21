import { Vector3 } from '@react-three/fiber/dist/declarations/src/three-types';
import { useState } from 'react';
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
    const rowStartIndex = Math.floor(given.rows / 2);
    const columnStartIndex = Math.floor(given.columns / 2);

    const halfRowsCount = rowStartIndex + Number(calculationsHelpers.isOdd(given.rows));
    const halfColumnsCount = columnStartIndex + Number(calculationsHelpers.isOdd(given.columns));
    // const [previousCollumColor, setPreviousCollumColor] = useState<string>('')
    // const [previousRowColor, setPreviousRowColor] = useState<string>('')
    // const [currentRow, setCurrentRow] = useState<number>(0)

    for (let rows = rowStartIndex * -1; rows < halfRowsCount; rows++) {
        for (let columns = columnStartIndex * -1; columns < halfColumnsCount; columns++) {
            const color = given.colorsKeys[getRandomInt(given.colorsKeys.length)];

            // for (let rows = 0; rows < given.rows; rows++) {
            //     // setCurrentRow(rows);
            //     for (let columns = 0 ; columns < given.columns; columns++) {
            //         let color = given.colorsKeys[getRandomInt(given.colorsKeys.length)];
            // if (rows !== currentRow) {
            //     setPreviousCollumColor(color);
            // }
            // setPreviousRowColor(color)
            tiles = [...tiles, {
                color,
                position: [columns, rows, 0],
                boxId: `ID_${columns}C_${rows}R_${color}`,
            }];
        }
    }


    return tiles;
};
