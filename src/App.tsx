import React, { useState } from 'react';
import { createTheme, CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Screens } from './screens/types';
import { ScreenSelector } from './screens';
import './i18n';
import { useStyles } from './styles';

export interface GlobalDataProviderProps {
    currentScreen: Screens;
}

export const initialGlobalDataProvider: GlobalDataProviderProps = {
    currentScreen: Screens.MainMenu,
};

const theme: Theme = createTheme({});
const App = () => {
    const [globalDataProvider, setGlobalDataProvider] = useState<GlobalDataProviderProps>(
        initialGlobalDataProvider,
    );
    const { t } = useTranslation();
    const styles = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/*{t('title', { ns: 'part1' })}*/}
            <ScreenSelector
                className={styles.appWrapper}
                globalData={globalDataProvider}
                setGlobalDataProvider={(globalData) => setGlobalDataProvider(globalData)}
            />
        </ThemeProvider>
    );
};

export default App;
