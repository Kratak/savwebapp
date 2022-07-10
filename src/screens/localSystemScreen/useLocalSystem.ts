import { useEffect, useState } from 'react';

import { useInGameScreenPush } from '../../helpers/useInGameScreenPush';
import { useGameSaves } from '../../helpers';

import { useStyles } from './styles';
import { Screens, ScreenSelectorProps } from '../types';

export const useLocalSystem = (props: ScreenSelectorProps) => {
    const styles = useStyles();
    const { getSaveSlot } = useGameSaves();
    const { screenHandlers } = useInGameScreenPush(props);
    const [resumeAvailable, setResumeAvailable] = useState<boolean>(false);
    const [loadAvailable, setLoadAvailable] = useState<boolean>(false);

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
        screenHandlers,
    };
};