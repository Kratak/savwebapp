import { useEffect, useMemo, useState } from 'react';

import { useInGameScreenPush } from '../../helpers/useInGameScreenPush';
import { useGameSaves } from '../../helpers';

import { useStyles } from './styles';
import { Screens, ScreenSelectorProps } from '../types';
import { getFirstSystemRandomGrid, SystemTileKeys } from './helepers';

export const useLocalSystem = (props: ScreenSelectorProps) => {
    const styles = useStyles();
    const { getSaveSlot } = useGameSaves();
    const { screenHandlers } = useInGameScreenPush(props);
    const [resumeAvailable, setResumeAvailable] = useState<boolean>(false);
    const [loadAvailable, setLoadAvailable] = useState<boolean>(false);
    const [playerLocation, sePlayerLocation] = useState<{ X: number, Y: number }>({ X: 0, Y: 0 });

    const generatedTiles = useMemo(() => getFirstSystemRandomGrid({
        rows: 8,
        columns: 8,
        selectedTiles: [],
    }), []);

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

    useEffect(() => {
        const startLocations = generatedTiles.find(item => item.find(innerItem => innerItem.name === SystemTileKeys.startSystemTile))?.find(item => item.name === SystemTileKeys.startSystemTile);
        if (startLocations) {
            sePlayerLocation({ ...startLocations.hexPosition });
        }
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
        },
        data: {
            playerLocation,
            generatedTiles,
        },
        screenHandlers,
    };
};
