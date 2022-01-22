import React from 'react';
import { Canvas } from '@react-three/fiber';

import SimpleBox from '../../3Dcomponents/SimpleBox';
import { SimpleGameModeColors } from '../../gameModes/simple';
import { Settings } from '../../UIcomponents/settings';

import { ScreenSelectorProps } from '../types';
import UseCamera from './UseCamera';
import { initials } from './initials';
import { UseGameActions } from './useGameActions';

const NewGameFiberScreen = (props: ScreenSelectorProps): JSX.Element => {
    const { classes, settings, handlers, tiles, selectedTiles } = UseGameActions(props);

    return (
        <div>
            <h1>Space and Void</h1>
            <div className={classes.windowWrapper}>
                <h2>'Game screen'</h2>
                <Settings {...settings}>
                    <div></div>
                </Settings>
                <div onClick={() => handlers.setOpenSetting(true)}>open setting</div>

                <div className={classes.threeWrapper}>
                    <Canvas camera={{ position: initials.camera.cameraPosition }}>
                        <UseCamera cameraZoom={settings.passedValues.cameraZoom} />
                        <ambientLight intensity={settings.passedValues.intensity} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                        <pointLight position={[-10, -10, -10]} />
                        {tiles.map((item, index) => {
                                return item.map(innerItem => {
                                    console.log('innerItem', innerItem)
                                    return (
                                        <SimpleBox
                                            boxColor={SimpleGameModeColors[innerItem.color]}
                                            boxId={innerItem.boxId}
                                            key={innerItem.boxId}
                                            position={innerItem.position}
                                            selectedTiles={selectedTiles}
                                        />
                                    );
                                });
                            },
                        )}
                    </Canvas>
                </div>
            </div>
        </div>
    );
};

export default NewGameFiberScreen;


