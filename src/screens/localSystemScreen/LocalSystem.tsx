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
                        //todo add XR XL handling
                        const { X: playerX, Y: playerY } = player.position;
                        if (rowX === playerX && rowY === playerY) {
                            showPlayer = true;
                        }

                        if (!showPlayer && data.hoveredTile && rowX === data.hoveredTile.X && rowY === data.hoveredTile.Y) {
                            showHover = 'canotMove';
                            if (rowX === playerX) {
                                if (playerY + player.range === rowY || playerY - player.range === rowY) {
                                    showHover = 'canMove';
                                }
                            }

                            if (rowY === playerY) {
                                if (playerX + player.range === rowX || playerX - player.range === rowX) {
                                    showHover = 'canMove';
                                }
                            }

                            console.log('showHover', showHover);
                            className = classNames(className, styles.hovered, showHover);
                        }

                        return <div
                            className={className}
                            key={row.tileId}
                            onClick={handlers.handleOnTileSelect(row)}
                            onMouseEnter={handlers.handleOnTileHover(row)}
                            onMouseLeave={handlers.handleOnTileHoverOff}

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
