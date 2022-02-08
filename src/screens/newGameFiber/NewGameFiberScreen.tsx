import React from 'react';
import { Canvas } from '@react-three/fiber';

import SimpleBox from '../../3Dcomponents/SimpleBox';
import { Settings } from '../../UIcomponents/settings';

import { ScreenSelectorProps } from '../types';
import UseCamera from './UseCamera';
import { initials } from './initials';
import { UseGameActions } from './useGameActions';
import { SimpleGameModeColors, SimpleGameModeColorsKeys } from '../../gameModes/simple/colors';

const NewGameFiberScreen = (props: ScreenSelectorProps): JSX.Element => {
    const { data, settings, handlers } = UseGameActions<SimpleGameModeColorsKeys>(props);

    return (
        <div>
            <h1>Space and Void</h1>
            <div className={data.classes.windowWrapper}>
                <h2>'Game screen'</h2>
                <Settings {...settings}>
                    <div></div>
                </Settings>
                <div className={data.classes.counters}>
                    {data.displayData.scoreCounters.map(item => <div
                        key={item.key} className={data.classes.counter}
                        style={{ border: `solid 2px ${SimpleGameModeColors[item.key]}` }}>{item.value}</div>)}
                </div>
                <div onClick={() => handlers.setOpenSetting(true)}>open setting</div>

                <div className={data.classes.threeWrapper}>
                    <Canvas camera={{ position: initials.camera.cameraPosition }}>
                        <UseCamera cameraZoom={settings.passedValues.cameraZoom} />
                        <ambientLight intensity={settings.passedValues.intensity} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                        <pointLight position={[-10, -10, -10]} />
                        {data.tiles.map((item, index) =>
                            item.map(innerItem => {
                                    if (!innerItem.renderTile) {
                                        return;
                                    }
                                    return (
                                        <SimpleBox<SimpleGameModeColorsKeys>
                                            gridPosition={innerItem.gridPosition}
                                            boxColor={innerItem.color}
                                            boxId={innerItem.boxId}
                                            key={innerItem.boxId}
                                            tilePosition={innerItem.position}
                                            selectedTiles={data.selectedTiles}
                                            tiles={data.tiles}
                                            setTiles={handlers.setTiles}
                                            setReadyForCounting={handlers.setReadyForCounting}
                                            meshStandardMaterial={{
                                                wireframe: settings.passedValues.wireframeOn,
                                            }}
                                        />
                                    );
                                },
                            ),
                        )}
                    </Canvas>
                    <div className={data.classes.uiWrapper}>
                        <div onClick={() => {
                            // todo move call to use effect
                            handlers.tilesToDelete({ column: { index: 3, rows: [1, 2, 3] } });
                            handlers.tilesToDelete({ row: { index: 2, columns: [2, 3, 4] } });
                        }
                        }>row 2 from 2-4 // column 3 from 0-2
                        </div>
                        <div onClick={() => {
                            // todo move call to use effect
                            handlers.tilesToDelete({ row: { index: 4, columns: [2, 3, 4] } });
                            handlers.tilesToDelete({ column: { index: 3, rows: [1, 2, 3] } });
                        }
                        }>row 2 from 2-4 // column 3 from 0-2
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewGameFiberScreen;


