import { useState } from 'react';
import { Screens, ScreenSelectorProps } from '../types';
import { useStyles } from './styles';

export const useMainMenu = (props: ScreenSelectorProps) => {
    const styles = useStyles();
    const [resumeAvailable, setResumeAvailable] = useState<boolean>(false);
    const [loadAvailable, setLoadAvailable] = useState<boolean>(false);

    const handleResumeGame = () => {
        console.log('handleResumeGame');
    };

    const handleOpenLoadModal = () => {
        console.log('handleOpenLoadModal');
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
            handleOpenLoadModal,
        },
    };
};
