import React, { useRef, useState, useEffect, Dispatch } from 'react';
import { MeshProps } from '@react-three/fiber/dist/declarations/src/three-types';
import { ThreeEvent } from '@react-three/fiber/dist/declarations/src/core/events';

interface BoxProps extends MeshProps {
    boxColor?: string;
    boxId: string;
    selected: [string, Dispatch<string>];
}


const Box = (props: BoxProps) => {
    const [selected, setSelected] = props.selected;
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

    const handleSelect = (event: ThreeEvent<MouseEvent>) => {
        if (!clicked) {
            setSelected(props.boxId);
        } else {
            setSelected('');
        }
        setClicked(!clicked);
    };

    useEffect(() => {
        if (selected !== props.boxId) {
            setClicked(false);
        }
    }, [selected])

    return (
        <mesh
            {...props}
            ref={ref}
            scale={selected === props.boxId ? 1.5 : 1}
            onClick={handleSelect}
            onPointerOver={(event) => setHovered(true)}
            onPointerOut={(event) => setHovered(false)}>
            <boxGeometry args={[.7, .7, .7]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : props?.boxColor || 'orange'} />
        </mesh>
    );
};

export default Box;
