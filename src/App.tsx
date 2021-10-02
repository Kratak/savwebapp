import React, { useState } from 'react';
import { Screens } from './screens/types';
import { ScreenSelector } from './screens';
import { createTheme, Theme, ThemeProvider } from '@material-ui/core/styles';


const theme: Theme = createTheme({});
const App = () => {
    const [currentScreen, setCurrentScreen] = useState<Screens>(
        Screens.MainMenu,
    );
    return (
        <ThemeProvider theme={theme}>
            <ScreenSelector
                selectedScree={currentScreen}
                setSelectedScreen={(screen) => setCurrentScreen(screen)}
            />
        </ThemeProvider>
    );
};

export default App;
