import React, { useState } from 'react';
import { createTheme, Theme, ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Screens } from './screens/types';
import { ScreenSelector } from './screens';
import './i18n';

const theme: Theme = createTheme({});
const App = () => {
    const [currentScreen, setCurrentScreen] = useState<Screens>(
        Screens.MainMenu,
    );
    const { t } = useTranslation();
    return (
        <ThemeProvider theme={theme}>
            {/*{t('title', { ns: 'part1' })}*/}
            <ScreenSelector
                selectedScreen={currentScreen}
                setSelectedScreen={(screen) => setCurrentScreen(screen)}
            />
        </ThemeProvider>
    );
};

export default App;
