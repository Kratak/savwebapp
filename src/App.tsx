import React, { useState } from 'react';
import { createTheme, CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Screens } from './screens/types';
import { ScreenSelector } from './screens';
import './i18n';
import { useStyles } from './styles';

const theme: Theme = createTheme({});
const App = () => {
    const [currentScreen, setCurrentScreen] = useState<Screens>(
        Screens.MainMenu,
    );
    const { t } = useTranslation();
    const styles = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/*{t('title', { ns: 'part1' })}*/}
            <ScreenSelector
                className={styles.appWrapper}
                selectedScreen={currentScreen}
                setSelectedScreen={(screen) => setCurrentScreen(screen)}
            />
        </ThemeProvider>
    );
};

export default App;
