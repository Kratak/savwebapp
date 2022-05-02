import React, { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { MeshProps } from '@react-three/fiber/dist/declarations/src/three-types';
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events';

import { adjustColor } from '../../helpers';
import { GridPositionProps, TilesGridObject } from '../../gameModes/simple/helpers';
import { SimpleGameModeColors, SimpleGameModeColorsKeys } from '../../gameModes/simple/colors';
import { Vector3Tuple } from 'three/src/math/Vector3';
import { SelectedTilesData } from '../../screens/gameScreens/simpleBattlefield/types';
import { MeshStandardMaterialParameters } from 'three/src/materials/MeshStandardMaterial';

interface BoxProps<ColorKeys extends string> extends MeshProps {
    tilePosition: Vector3Tuple;
    gridPosition: GridPositionProps;
    boxColor: ColorKeys;
    boxId: string;
    selectedTiles: [Array<SelectedTilesData<ColorKeys>>, Dispatch<Array<SelectedTilesData<ColorKeys>>>];
    tiles: Array<Array<TilesGridObject<ColorKeys>>>;
    setTiles: Dispatch<Array<Array<TilesGridObject<ColorKeys>>>>;
    setReadyForCounting: Dispatch<boolean>;
    meshStandardMaterial?: MeshStandardMaterialParameters;
}

const Box = <ColorKeys extends string>(props: BoxProps<ColorKeys>) => {
    const [selectedTiles, setSelectedTiles] = props.selectedTiles;
    // This reference gives us direct access to the THREE.Mesh object
    const ref: any = useRef();
    // Hold state for hovered and clicked events
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (ref.current.rotation.x += 0.01));
    // Return the view, these are regular Threejs elements expressed in JSX
    // useEffect(() => {
    // }, [props.boxId]);


    const hoveredColor = useCallback(() => props.boxColor && adjustColor(SimpleGameModeColors[props.boxColor as SimpleGameModeColorsKeys], 20), [props.boxColor]);

    const handleSelect = (event: ThreeEvent<MouseEvent>) => {
        const { boxId, gridPosition, tilePosition: position, boxColor: color } = props;
        const tileData = { boxId, gridPosition, position, color };
        let arr: Array<SelectedTilesData<ColorKeys>> = [];


        if (!clicked) {
            arr = [tileData];
            if (selectedTiles.length > 0) {
                let actionAllowed: boolean = false;
                const positionFirstSelected = selectedTiles[0].gridPosition;
                const firstSelected = props.tiles[positionFirstSelected.columns][positionFirstSelected.rows];
                const secondSelected = props;

                const leftCorrect = firstSelected.gridPosition.columns - 1 === secondSelected.gridPosition.columns;
                const rightCorrect = firstSelected.gridPosition.columns + 1 === secondSelected.gridPosition.columns;
                const bottomCorrect = firstSelected.gridPosition.rows - 1 === secondSelected.gridPosition.rows;
                const topCorrect = firstSelected.gridPosition.rows + 1 === secondSelected.gridPosition.rows;

                const leftSame = firstSelected.gridPosition.columns === secondSelected.gridPosition.columns;
                const rightSame = firstSelected.gridPosition.columns === secondSelected.gridPosition.columns;
                const bottomSame = firstSelected.gridPosition.rows === secondSelected.gridPosition.rows;
                const topSame = firstSelected.gridPosition.rows === secondSelected.gridPosition.rows;

                if (
                    ((topCorrect || bottomCorrect) && (rightSame || leftSame))
                    ||
                    ((leftCorrect || rightCorrect) && (bottomSame || topSame))
                ) {
                    actionAllowed = true;
                }


                if (actionAllowed) {
                    arr = [tileData, ...selectedTiles];
                    if (props.boxId === selectedTiles[0]?.boxId) {
                        arr = [tileData];
                    }

                }
            }
        } else {
            arr = [];
        }

        setClicked(!clicked);
        setSelectedTiles(arr.slice(0, 2));
    };

    useEffect(() => {
        const includesCheck = selectedTiles.find(item => item.boxId === props.boxId);
        if (!includesCheck) {
            setClicked(false);
        }
    }, [selectedTiles, clicked]);

    useEffect(() => {
        if (clicked && selectedTiles.length > 1) {
            const tilesCopy: Array<SelectedTilesData<ColorKeys>> = selectedTiles.map(item => item);
            const firstSelected = tilesCopy[1];
            const secondSelected = tilesCopy[0];

            props.setTiles(props.tiles.map(rows => {
                return rows.map(columns => {
                    if (firstSelected.boxId === columns.boxId) {
                        return {
                            ...columns,
                            color: secondSelected.color,
                        };
                    }
                    if (secondSelected.boxId === columns.boxId) {
                        return {
                            ...columns,
                            color: firstSelected.color,
                        };
                    }
                    return columns;
                });
            }));


            props.setReadyForCounting(true);
            setClicked(false);
        }
    }, [selectedTiles]);

    return (
        <mesh
            {...props}
            position={props.tilePosition}
            ref={ref}
            scale={clicked ? 1.5 : hovered ? 1.05 : 1}
            onClick={handleSelect}
            onPointerOver={(event) => setHovered(true)}
            onPointerOut={(event) => setHovered(false)}>
            <boxGeometry args={[.7, .7, .7]} />
            <meshStandardMaterial
                color={hovered ? hoveredColor() : SimpleGameModeColors[props.boxColor as SimpleGameModeColorsKeys] || 'orange'}
                {...props.meshStandardMaterial}
            />
        </mesh>
    );
};

export default Box;
