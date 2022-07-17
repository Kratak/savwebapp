import React from 'react';
import classNames from 'classnames';

import { ScreenSelectorProps } from '../types';
import { useLocalSystem } from './useLocalSystem';


const LocalSystem = (props: ScreenSelectorProps): JSX.Element => {
    const { styles, data } = useLocalSystem(props);

    return (
        <div className={styles.mainMenuWrapper}>
            <h1 className={styles.gameTitle}>System/area name</h1>
            <div className={styles.wrapper}>
                {/*<div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>*/}
                {data.generatedTiles.map((column, columnIndex) => {
                    return column.map(row => {
                        let showPlayer = false;
                        if (row.hexPosition.X === data.playerLocation.X && row.hexPosition.Y === data.playerLocation.Y) {
                            console.log(row);
                            showPlayer = true;
                        }
                        return <div
                            className={classNames(styles.hexagon, styles[row.name])}
                            key={row.tileId}
                            onClick={() => console.log(row.color)}
                            // style={{
                            //     backgroundColor: row.color,
                            //     width: 32,
                            //     height: 32,
                            //     marginLeft: isOdd(row.position[1]) ? 0 : -16,
                            // }}
                        >
                            {showPlayer && <div className={styles.player}>P</div>}
                            <div
                                className={styles.hexagontent}>{row.name}<br />{['XL:', row.hexPosition.XL, 'Y:', row.hexPosition.Y, 'XR:', row.hexPosition.XR].toString()}
                            </div>
                        </div>;
                    });

                })}
            </div>
        </div>
    );
};

export default LocalSystem;
