import React, { useState } from 'react';
import { createTheme, CssBaseline, Theme, ThemeProvider } from '@mui/material';
// import { useTranslation } from 'react-i18next';
import { Screens } from './screens/types';
import { ScreenSelector } from './screens';
import './i18n';
import { useStyles } from './styles';
import { HexPositionParameters } from './screens/localSystemScreen/helepers';
import { CurrentGameModes } from './helpers';

export interface GlobalDataProviderProps {
    currentScreen: Screens;
    saving: boolean;
    currentSaveData: {
        currentGameModes: CurrentGameModes;
        shardCount: number;
        saveId: string | null;
        saveName: string | null;
        sectorData: null | {
            playerPosition: HexPositionParameters;
            sectorId: string;
        };
        tileGameData: null | {};
    };
}

export const initialGlobalDataProvider: GlobalDataProviderProps = {
    currentScreen: Screens.MainMenu,
    saving: false,
    currentSaveData: {
        shardCount: 0,
        currentGameModes: CurrentGameModes.galaxy,
        saveId: null,
        saveName: null,
        sectorData: null,
        tileGameData: null,

    },
};

const theme: Theme = createTheme({});
const App = () => {
    const [globalDataProvider, setGlobalDataProvider] = useState<GlobalDataProviderProps>(
        initialGlobalDataProvider,
    );
    // const { t } = useTranslation();
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
