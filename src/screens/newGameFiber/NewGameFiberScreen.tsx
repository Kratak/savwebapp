import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

import SimpleBox from '../../3Dcomponents/SimpleBox';
import { getTilesGrid, SimpleGameModeColors } from '../../gameModes/simple';
import { TilesGridObject } from '../../gameModes/simple/helpers';

import { Screens, ScreenSelectorProps } from '../types';
import { useStyles } from './styles';

const gameSceneSize = {
    width: 640,
    height: 480,
};

const NewGameFiberScreen = (props: ScreenSelectorProps): JSX.Element => {
    const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
    const [tiles, setTiles] = useState<Array<TilesGridObject>>([]);
    const styles = useStyles();


    useEffect(() => {
        const newTiles = getTilesGrid({
            columns: 6,
            rows: 6,
            availableColors: Object.keys(SimpleGameModeColors),
        });

        setTiles(newTiles);
    }, []);

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
                        {tiles.map((item, index) => {
                            return <SimpleBox key={index + item.color} position={item.position}
                                              boxColor={item.color} />;
                        })}
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


