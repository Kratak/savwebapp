import { useEffect, useMemo, useState } from 'react';

import { useInGameScreenPush } from '../../helpers/useInGameScreenPush';
import { useGameSaves } from '../../helpers';

import { useStyles } from './styles';
import { Screens, ScreenSelectorProps } from '../types';
import { FirstSystemGridItem, getFirstSystemRandomGrid, HexPositionParameters, SystemTileKeys } from './helepers';

export const useLocalSystem = (props: ScreenSelectorProps) => {
    const styles = useStyles();
    const { getSaveSlot, save } = useGameSaves(props);
    const { screenHandlers } = useInGameScreenPush(props);
    const [resumeAvailable, setResumeAvailable] = useState<boolean>(false);
    const [loadAvailable, setLoadAvailable] = useState<boolean>(false);
    const [playerLocation, sePlayerLocation] = useState<HexPositionParameters>({
        X: 0,
        Y: 0,
        XR: 0,
        XL: 0,
        isOdd: false,
    });
    const [hoveredTile, setHoveredTile] = useState<HexPositionParameters | null>(null);

    const generatedTiles = useMemo(() => getFirstSystemRandomGrid({
        rows: 8,
        columns: 8,
        selectedTiles: [],
        gridId: 'first-system',
    }), []);

    const playerRange = 1;
    const handleResumeGame = () => {
        console.log('handleResumeGame');
        screenHandlers.gotToSelectedScreen(Screens.InGameSimpleBattlefield);
    };

    const handleOpenLoadScreen = () => {
        console.log('handleOpenLoadModal');
        screenHandlers.gotToSelectedScreen(Screens.Loads);
    };

    const handleOpenSettingsScreen = () => {
        console.log('handleOpenSettingsScreen');
        screenHandlers.gotToSelectedScreen(Screens.Settings);
    };

    const handleStartNewGame = () => {
        console.log('handleResumeGame');
        screenHandlers.gotToSelectedScreen(Screens.NewGame);
    };

    const handleAttemptToMovePlayer = () => {

    };

    const handleOnTileSelect = (tileData: FirstSystemGridItem, actionAllowed: boolean) => () => {
        if (actionAllowed && hoveredTile !== null && tileData.available) {
            if (tileData.specialConditions?.action) {
                // save()
                tileData.specialConditions.action(props);
            }
            // switch ()
            sePlayerLocation(tileData.hexPosition);
        }
        // console.log(row.hexPosition, row.name);
    };

    const handleOnTileHover = (row: FirstSystemGridItem) => () => {
        setHoveredTile(row.hexPosition);
        // console.log('hovered tile: ', row.hexPosition, row.name);
    };

    const handleOnTileHoverOff = () => {
        setHoveredTile(null);
        // console.log('hovered tile off: ');
    };

    useEffect(() => {
        const startLocations = generatedTiles.data.find(item => item.find(innerItem => innerItem.name === SystemTileKeys.startSystemTile))?.find(item => item.name === SystemTileKeys.startSystemTile);
        if (startLocations) {
            sePlayerLocation({ ...startLocations.hexPosition });
        }
        props.setGlobalDataProvider({
            ...props.globalData,
            currentScreen: Screens.LocalSystem,
            saving: true,
            currentSaveData: { ...props.globalData.currentSaveData, saveId: generatedTiles.gridId, },
        });
    }, []);

    useEffect(() => {
        getSaveSlot()
            .then(saveData => {
                if (saveData.length > 0) {
                    setLoadAvailable(true);
                    setResumeAvailable(true);
                }
            })
            .catch(e => console.log('Issue during load saves', e));

    }, [getSaveSlot]);

    return {
        styles,
        flags: {
            resumeAvailable,
            loadAvailable,
        },
        handlers: {
            handleResumeGame,
            handleStartNewGame,
            handleOpenLoadScreen,
            handleOpenSettingsScreen,
            sePlayerLocation,
            handleOnTileSelect,
            handleOnTileHover,
            handleOnTileHoverOff,
        },
        data: {
            hoveredTile,
            generatedTiles: generatedTiles.data,
        },
        player: {
            range: playerRange,
            position: playerLocation,
        },
        screenHandlers,
    };
};
