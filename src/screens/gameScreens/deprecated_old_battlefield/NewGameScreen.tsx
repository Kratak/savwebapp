import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { Screens, ScreenSelectorProps } from '../../types';
import { useStyles } from './styles';
import { useInGameScreenPush } from '../../../helpers/useInGameScreenPush';

const gameSceneSize = {
    width: 640,
    height: 480,
};


const NewGameScreen = (props: ScreenSelectorProps): JSX.Element => {
    const { screenHandlers } = useInGameScreenPush(props);
    const [cubeSize, setCubeSize] = useState(1);
    const [cubeScale, setCubeScale] = useState(10);
    const [cubeScalePing, setCubeScalePing] = useState(false);
    const styles = useStyles();
    const mountRef = useRef<any>();

    const globeRef = useRef(new THREE.BoxGeometry(1, 1, 1));


    useEffect(() => {

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(gameSceneSize.width, gameSceneSize.height);
        mountRef.current.appendChild(renderer.domElement);

        const geometry = globeRef.current;
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);
        camera.position.z = 5;

        const animate = function() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();

        return () => mountRef.current?.removeChild(renderer.domElement);
    }, [mountRef, globeRef]);

    useEffect(() => {
        globeRef.current.scale(cubeScale / 10, cubeScale / 10, cubeScale / 10);
    }, [cubeScale, cubeScalePing]);

    return (
        <div>
            <h1>Space and Void</h1>
            <div className={styles.windowWrapper}>
                <h2>'Game screen'</h2>
                <div ref={mountRef} className={styles.threeWrapper} />

                <div className={styles.uiWrapper}>

                    <button onClick={() => {
                        setCubeScalePing(!cubeScalePing);
                        setCubeScale(10 + 1);
                    }}>
                        increase by .1
                    </button>
                    <button onClick={() => screenHandlers.gotToSelectedScreen(Screens.MainMenu)}>
                        Back to Main Menu
                    </button>
                    <button onClick={() => {
                        setCubeScalePing(!cubeScalePing);
                        setCubeScale(10 - 1);
                    }}>
                        decrees by .1
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewGameScreen;
