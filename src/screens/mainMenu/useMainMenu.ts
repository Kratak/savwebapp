import { useState } from 'react';
import { Screens, ScreenSelectorProps } from '../types';
import { useStyles } from './styles';
import { useInGameScreenPush } from '../../helpers/useInGameScreenPush';

export const useMainMenu = (props: ScreenSelectorProps) => {
    const styles = useStyles();
    const { screenHandlers } = useInGameScreenPush(props);
    const [resumeAvailable, setResumeAvailable] = useState<boolean>(false);
    const [loadAvailable, setLoadAvailable] = useState<boolean>(true);

    const handleResumeGame = () => {
        console.log('handleResumeGame');
        screenHandlers.gotToSelectedScreen(Screens.GameFaber);
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
        screenHandlers.gotToSelectedScreen(Screens.GameFaber);
    };

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
