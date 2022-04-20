import { useState } from 'react';
import { Screens, ScreenSelectorProps } from '../types';
import { useStyles } from './styles';

export const useMainMenu = (props: ScreenSelectorProps) => {
    const styles = useStyles();
    const [resumeAvailable, setResumeAvailable] = useState<boolean>(false);
    const [loadAvailable, setLoadAvailable] = useState<boolean>(true);

    const handleResumeGame = () => {
        console.log('handleResumeGame');
        props.setSelectedScreen(Screens.GameFaber);
    };

    const handleOpenLoadScreen = () => {
        console.log('handleOpenLoadModal');
        props.setSelectedScreen(Screens.Loads);
    };

    const handleOpenSettingsScreen = () => {
        console.log('handleOpenSettingsScreen');
        props.setSelectedScreen(Screens.Settings);
    };

    const handleStartNewGame = () => {
        console.log('handleResumeGame');
        props.setSelectedScreen(Screens.GameFaber);
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
    };
};
