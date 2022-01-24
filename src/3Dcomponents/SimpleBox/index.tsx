import React, { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { MeshProps } from '@react-three/fiber/dist/declarations/src/three-types';
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events';

import { adjustColor } from '../../genericHelpers';
import { TilesGridObject } from '../../gameModes/simple/helpers';
import { SimpleGameModeColorsKeys } from '../../gameModes/simple/colors';
import { Vector3Tuple } from 'three/src/math/Vector3';

interface BoxProps extends MeshProps {
    boxColor?: string;
    boxId: string;
    selectedTiles: [Array<string>, Dispatch<Array<string>>];
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
        const arr = !clicked ? props.boxId === selectedTiles[0] ? [props.boxId] : [props.boxId, ...selectedTiles] : [];
        setClicked(!clicked);
        setSelectedTiles(arr.slice(0, 2));
    };

    useEffect(() => {
        const includesCheck = selectedTiles.includes(props.boxId);
        if (!includesCheck) {
            setClicked(false);
        }
    }, [selectedTiles, clicked]);

    useEffect(() => {
        if (clicked && selectedTiles.length > 1 && selectedTiles.includes(props.boxId)) {
            const fistLayerBoxOne = props.tiles.find(item => item.find(inner => inner.boxId === props.boxId));
            const fistLayerIdBoxTwo = selectedTiles.find(item => item !== props.boxId);
            const fistLayerBoxTwo = props.tiles.find(item => item.find(inner => inner.boxId === fistLayerIdBoxTwo));

            if (fistLayerBoxOne && fistLayerBoxOne.length > 1 && fistLayerBoxTwo && fistLayerBoxTwo.length > 1) {
                const indexOfColumnBoxOne = props.tiles.indexOf(fistLayerBoxOne);
                const indexOfColumnBoxTwo = props.tiles.indexOf(fistLayerBoxTwo);
                const searchedObjectBoxOne = fistLayerBoxOne.find(item => item.boxId === props.boxId);
                const searchedObjectBoxTwo = fistLayerBoxTwo.find(item => item.boxId === fistLayerIdBoxTwo);

                if (searchedObjectBoxOne && searchedObjectBoxTwo) {
                    const indexOfRowBoxOne = props.tiles[indexOfColumnBoxOne].indexOf(searchedObjectBoxOne);
                    const indexOfRowBoxTwo = props.tiles[indexOfColumnBoxTwo].indexOf(searchedObjectBoxTwo);
                    const currentTileBoxOne = props.tiles[indexOfColumnBoxOne][indexOfRowBoxOne].position.map(item => item) as Vector3Tuple;
                    const currentTileBoxTwo = props.tiles[indexOfColumnBoxTwo][indexOfRowBoxTwo].position.map(item => item) as Vector3Tuple;

                    props.tiles[indexOfColumnBoxOne][indexOfRowBoxOne] = {
                        ...props.tiles[indexOfColumnBoxOne][indexOfRowBoxOne],
                        position: currentTileBoxTwo,
                    };
                    props.tiles[indexOfColumnBoxTwo][indexOfRowBoxTwo] = {
                        ...props.tiles[indexOfColumnBoxTwo][indexOfRowBoxTwo],
                        position: currentTileBoxOne,
                    };
                    setSelectedTiles([]);
                    setClicked(false);
                }
            }
        }
    }, [selectedTiles]);


    return (
        <mesh
            {...props}
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
