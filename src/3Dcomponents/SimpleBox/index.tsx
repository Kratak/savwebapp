import React, { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { MeshProps } from '@react-three/fiber/dist/declarations/src/three-types';
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events';

import { adjustColor } from '../../genericHelpers';
import { GridPositionProps, TilesGridObject } from '../../gameModes/simple/helpers';
import { SimpleGameModeColorsKeys } from '../../gameModes/simple/colors';
import { Vector3Tuple } from 'three/src/math/Vector3';
import { SelectedTilesData } from '../../screens/newGameFiber/types';

interface BoxProps extends MeshProps {
    tilePosition: Vector3Tuple;
    gridPosition: GridPositionProps;
    boxColor?: string;
    boxId: string;
    selectedTiles: [Array<SelectedTilesData>, Dispatch<Array<SelectedTilesData>>];
    tiles: Array<Array<TilesGridObject<SimpleGameModeColorsKeys>>>;
    setTiles: Dispatch<Array<Array<TilesGridObject<SimpleGameModeColorsKeys>>>>;
}

const Box = (props: BoxProps) => {
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

    const hoveredColor = useCallback(() => props.boxColor && adjustColor(props.boxColor, 20), [props.boxColor]);

    const handleSelect = (event: ThreeEvent<MouseEvent>) => {
        const tileData = { boxId: props.boxId, position: props.tilePosition, gridPosition: props.gridPosition };
        const arr: Array<SelectedTilesData> = !clicked ?
            props.boxId === selectedTiles[0]?.boxId ? [tileData] : [tileData, ...selectedTiles]
            : [];
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
        if (clicked && selectedTiles.length > 1 && selectedTiles.find(item => item.boxId === props.boxId)) {
            const fistSelected = Object.assign({}, selectedTiles.find(item => item.boxId === props.boxId));
            const secondSelected = Object.assign({}, selectedTiles.find(item => item.boxId !== props.boxId));
            if (fistSelected && secondSelected) {
                props.tiles[fistSelected.gridPosition.columns][fistSelected.gridPosition.rows] = {
                    ...props.tiles[fistSelected.gridPosition.columns][fistSelected.gridPosition.rows],
                    position: secondSelected.position,
                };
                props.tiles[secondSelected.gridPosition.columns][secondSelected.gridPosition.rows] = {
                    ...props.tiles[secondSelected.gridPosition.columns][secondSelected.gridPosition.rows],
                    position: fistSelected.position,
                };
                setSelectedTiles([]);
                setClicked(false);
            }
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
            <meshStandardMaterial color={hovered ? hoveredColor() : props?.boxColor || 'orange'} />
        </mesh>
    );
};

export default Box;
