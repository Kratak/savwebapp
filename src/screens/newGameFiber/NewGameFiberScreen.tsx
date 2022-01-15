import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import { Screens, ScreenSelectorProps } from '../types';
import { useStyles } from './styles';
import { MeshProps } from '@react-three/fiber/dist/declarations/src/three-types';

const gameSceneSize = {
    width: 640,
    height: 480,
};

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


const NewGameFiberScreen = (props: ScreenSelectorProps): JSX.Element => {
    const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
    const styles = useStyles();
    return (
        <div>
            <h1>Space and Void</h1>
            <div className={styles.windowWrapper}>
                <h2>'Game screen'</h2>

                <div className={styles.threeWrapper}>
                    <Canvas>
                        <ambientLight intensity={ambientLightIntensity} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                        <pointLight position={[-10, -10, -10]} />
                        <Box position={[0, 0, 0]} boxColor={'green'} />
                        <Box position={[0, -1, 0]} />
                        <Box position={[0, 1, 0]} />
                        <Box position={[-1, 0, 0]} />
                        <Box position={[-1, 1, 0]} />
                        <Box position={[-1, -1, 0]} />
                        <Box position={[1, 0, 0]} />
                        <Box position={[1, -1, 0]} />
                        <Box position={[1, 1, 0]} />
                    </Canvas>
                </div>

                <div className={styles.uiWrapper}>

                    <button onClick={() => setAmbientLightIntensity(ambientLightIntensity + .1)}>
                        increase by .1
                    </button>
                    <button onClick={() => props.setSelectedScreen(Screens.MainMenu)}>
                        Back to Main Menu
                    </button>
                    <button onClick={() => setAmbientLightIntensity(ambientLightIntensity - .1)}>
                        decrees by .1
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NewGameFiberScreen;


