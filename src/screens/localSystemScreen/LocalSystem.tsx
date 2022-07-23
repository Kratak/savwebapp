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
                        const { X: rowX, Y: rowY, XR: rowXR, XL: rowXL } = row.hexPosition;
                        const { X: playerX, Y: playerY, XL: playerXL, XR: playerXR } = player.position;
                        if (rowX === playerX && rowY === playerY) {
                            showPlayer = true;
                        }

                        if (!showPlayer && data.hoveredTile && rowX === data.hoveredTile.X && rowY === data.hoveredTile.Y) {
                            showHover = 'canotMove';
                            console.log(rowY, playerY, player.range);

                            // bottom && top condition
                            if ((rowY > playerY && rowY - playerY <= player.range || playerY > rowY && playerY - rowY <= player.range) &&
                                (rowXR === playerXR || rowXL === playerXL)) {
                                showHover = 'canMove';
                            }

                            // XR and negative XR case

                            if (rowXR > playerXR && rowXR - playerXR <= player.range && rowY === playerY ||
                                playerXR > rowXR && playerXR - rowXR <= player.range && rowY + 1 === playerY) {
                                showHover = 'canMove';
                            }

                            // todo ned to handle odd and even columns


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
