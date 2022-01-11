import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { Screens, ScreenSelectorProps } from '../types';
import { useStyles } from './styles';

const gameSceneSize = {
    width: 640,
    height: 480,
};


const NewGameScreen = (props: ScreenSelectorProps): JSX.Element => {
    const styles = useStyles();
    const mountRef = useRef<any>(null);

    useEffect(() => {

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(gameSceneSize.width, gameSceneSize.height);
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
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

        return () => mountRef.current.removeChild(renderer.domElement);
    }, []);

    return (
        <div>
            <h1>Space and Void</h1>
            <div className={styles.windowWrapper}>
                <h2>'Game screen'</h2>
                <div ref={mountRef} className={styles.threeWrapper}/>

                <button className={styles.uiWrapper} onClick={() => props.setSelectedScreen(Screens.MainMenu)}>
                    Back to Main Menu
                </button>
            </div>
        </div>
    );
};

export default NewGameScreen;
