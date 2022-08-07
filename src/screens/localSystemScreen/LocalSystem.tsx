import React from 'react';
import classNames from 'classnames';

import { ScreenSelectorProps } from '../types';
import { useLocalSystem } from './useLocalSystem';


const LocalSystem = (props: ScreenSelectorProps): JSX.Element => {
    const { styles, data, handlers, player } = useLocalSystem(props);

    return (
        <div className={styles.mainMenuWrapper}>
            <h1 className={styles.gameTitle}>System/area name</h1>
            <div className={styles.wrapper}>
                {data.generatedTiles.map((column, columnIndex) => {
                    return column.map(row => {
                        let showPlayer = false;
                        let showHover: false | 'canMove' | 'canotMove' = false;
                        let className = classNames(styles.hexagon, styles[row.name]);
                        const { X: rowX, Y: rowY } = row.hexPosition;
                        const { X: playerX, Y: playerY } = player.position;
                        if (rowX === playerX && rowY === playerY) {
                            showPlayer = true;
                        }

                        if (!showPlayer && data.hoveredTile && rowX === data.hoveredTile.X && rowY === data.hoveredTile.Y) {
                            showHover = 'canotMove';
                            const oddFactor = row.hexPosition.isOdd ? 1 : -1;


                            if (playerY === rowY || playerY + oddFactor === rowY) {
                                if (playerX > rowX && playerX - rowX <= player.range) {
                                    showHover = 'canMove';
                                }

                                if (rowX > playerX && rowX - playerX <= player.range) {
                                    showHover = 'canMove';
                                }
                            }

                            if (playerX === rowX) {

                                if (playerY > rowY && playerY - rowY <= player.range) {
                                    showHover = 'canMove';
                                }
                                if (rowY > playerY && rowY - playerY <= player.range) {
                                    showHover = 'canMove';
                                }

                            }

                            className = classNames(className, styles.hovered, showHover);
                        }

                        return <div
                            className={className}
                            key={row.tileId}
                            onClick={handlers.handleOnTileSelect(row, showHover === 'canMove')}
                            onMouseEnter={handlers.handleOnTileHover(row)}
                            onMouseLeave={handlers.handleOnTileHoverOff}

                        >
                            {showPlayer && <div className={styles.player}>P</div>}
                            <div
                                className={styles.hexagontent}>{row.name}<br />{['Y:', row.hexPosition.Y, 'X:', row.hexPosition.X, row.hexPosition.isOdd].toString().replace(/,/g, ' ')}
                            </div>
                        </div>;
                    });

                })}
            </div>
        </div>
    );
};

export default LocalSystem;
