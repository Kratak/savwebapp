import { Vector3Tuple } from 'three/src/math/Vector3';

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


export interface TilesGridObject<ColorKeys> {
    renderTile: boolean;
    position: Vector3Tuple;
    gridPosition: GridPositionProps;
    color: ColorKeys;
    boxId: string;
}

export interface GridPositionProps {
    columns: number;
    rows: number;
}

interface GetTilesGridProps<ColorKeys> {
    rows: number;
    columns: number;
    colors: Array<ColorKeys>;
}


export const getTilesGrid = <ColorKeys extends string>(given: GetTilesGridProps<ColorKeys>) => {
    let depTiles: Array<Array<TilesGridObject<ColorKeys>>> = [];

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
                gridPosition: {
                    columns,
                    rows,
                },
                renderTile: true,
                color,
                position: [columnNumber, rowNumber, 0],
                boxId: `ID_${columnNumber}C_${rowNumber}R_${color}`,
            }];
        }
        depTiles = [...depTiles, getObj];
    }

    return depTiles;
};
