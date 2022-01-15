import React, { useRef, useState } from 'react';
import { MeshProps } from '@react-three/fiber/dist/declarations/src/three-types';

interface BoxProps extends MeshProps {
    boxColor?: string;
}


const Box = (props: BoxProps) => {
    // This reference gives us direct access to the THREE.Mesh object
    const ref: any = useRef();
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (ref.current.rotation.x += 0.01));
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[.7, .7, .7]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : props?.boxColor || 'orange'} />
        </mesh>
    );
};

export default Box;
