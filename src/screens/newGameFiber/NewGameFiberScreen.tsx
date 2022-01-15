import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';

import SimpleBox from '../../3Dcomponents/SimpleBox';

import { Screens, ScreenSelectorProps } from '../types';
import { useStyles } from './styles';
import { getRandomArrayOfColors, SimpleGameModeColors } from '../../gameModes/simple';

const gameSceneSize = {
    width: 640,
    height: 480,
};

const NewGameFiberScreen = (props: ScreenSelectorProps): JSX.Element => {
    const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
    const styles = useStyles();

    console.log(getRandomArrayOfColors({
        howMuch: 20,
        availableColors: Object.keys(SimpleGameModeColors),
    }));

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
                        <SimpleBox position={[0, 0, 0]} boxColor={'green'} />
                        <SimpleBox position={[0, -1, 0]} />
                        <SimpleBox position={[0, 1, 0]} />
                        <SimpleBox position={[-1, 0, 0]} />
                        <SimpleBox position={[-1, 1, 0]} />
                        <SimpleBox position={[-1, -1, 0]} />
                        <SimpleBox position={[1, 0, 0]} />
                        <SimpleBox position={[1, -1, 0]} />
                        <SimpleBox position={[1, 1, 0]} />
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


