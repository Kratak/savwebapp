import React from 'react';
import { ScreenSelectorProps } from '../types';

import { useLocalSystem } from './useLocalSystem';
import { getTilesGrid } from '../../gameModes/simple';
import { SimpleGameModeColorsKeys } from '../../gameModes/simple/colors';
import { AvailableThemesKeys, initials } from '../gameScreens/simpleBattlefield/initials';
import { calculationsHelpers } from '../../helpers';


const LocalSystem = (props: ScreenSelectorProps): JSX.Element => {
    const { styles } = useLocalSystem(props);
    const { isOdd } = calculationsHelpers;

    const selectedColorKey = initials.availableColorThemes[AvailableThemesKeys.simple] as Array<SimpleGameModeColorsKeys>;
    const generatedTiles = getTilesGrid<SimpleGameModeColorsKeys>({
        colors: selectedColorKey,
        rows: 20,
        columns: 20,
    });


    return (
        <div className={styles.mainMenuWrapper}>
            <h1 className={styles.gameTitle}>System/area name</h1>
            <div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
                {generatedTiles.map((column, columnIndex) => {
                    return <div key={columnIndex}>
                        {column.map(row => {
                            return <div
                                key={row.boxId}
                                onClick={() => console.log(row.color, row.position)}
                                style={{
                                    backgroundColor: row.color,
                                    width: 32,
                                    height: 32,
                                    marginLeft: isOdd(row.position[1]) ? 0 : -16,
                                }} />;
                        })}
                    </div>;
                })}
            </div>
        </div>
    );
};

export default LocalSystem;
