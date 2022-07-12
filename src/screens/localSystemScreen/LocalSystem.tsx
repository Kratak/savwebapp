import React, { useMemo } from 'react';
import { ScreenSelectorProps } from '../types';

import { useLocalSystem } from './useLocalSystem';
import { getFirstSystemRandomGrid } from './helepers';
import classNames from 'classnames';


const LocalSystem = (props: ScreenSelectorProps): JSX.Element => {
    const { styles } = useLocalSystem(props);

    const generatedTiles = useMemo(() => getFirstSystemRandomGrid({
        rows: 8,
        columns: 8,
        selectedTiles: [],
    }), []);


    return (
        <div className={styles.mainMenuWrapper}>
            <h1 className={styles.gameTitle}>System/area name</h1>
            <div className={styles.wrapper}>
                {/*<div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>*/}
                {generatedTiles.map((column, columnIndex) => {
                    return column.map(row => {
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
                            <div className={styles.hexagontent}>{row.name}</div>
                        </div>;
                    });

                })}
            </div>
        </div>
    );
};

export default LocalSystem;
