import React, { useRef, useState, useEffect, Dispatch, useCallback } from 'react';
import { MeshProps } from '@react-three/fiber/dist/declarations/src/three-types';
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events';

import { adjustColor } from '../../genericHelpers';

interface BoxProps extends MeshProps {
    boxColor?: string;
    boxId: string;
    selectedPosition: [string, Dispatch<string>];
    selectedColorID: [string, Dispatch<string>];
    movedColorID: [string, Dispatch<string>];
}

const Box = (props: BoxProps) => {
    const [selectedPosition, setSelectedPosition] = props.selectedPosition;
    const [selectedColorID, setSelectedColorID] = props.selectedColorID;
    const [movedColorID, setMovedColorID] = props.movedColorID;
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
        if (!clicked) {
            setSelectedPosition(props.boxId);
        } else {
            setSelectedPosition('');
        }
        setClicked(!clicked);
    };

    useEffect(() => {
        if (selectedPosition !== props.boxId) {
            setClicked(false);
        }
    }, [selectedPosition]);

    useEffect(() => {
        if (selectedPosition === props.boxId) {
            if (!movedColorID) {
                setSelectedColorID(props.boxId);
                //TODO scenarios firstSelected
            }
            if (!!selectedColorID && selectedColorID !== props.boxId) {
                setMovedColorID(props.boxId);
            }
            //TODO scenarios firstDeselected
            //TODO scenarios correct secondSelected
            //TODO scenarios wrong secondSelected
        }
    }, [selectedColorID, movedColorID, selectedPosition]);

    return (
        <mesh
            {...props}
            ref={ref}
            scale={selectedPosition === props.boxId ? 1.5 : hovered ? 1.05 : 1}
            onClick={handleSelect}
            onPointerOver={(event) => setHovered(true)}
            onPointerOut={(event) => setHovered(false)}>
            <boxGeometry args={[.7, .7, .7]} />
            <meshStandardMaterial color={hovered ? hoveredColor() : props?.boxColor || 'orange'} />
        </mesh>
    );
};

export default Box;
