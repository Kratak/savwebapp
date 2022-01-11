import { Screens } from './types';
import CreditsScreen from './credits';
import MainMenuScreen from './mainMenu';
import SettingsScreen from './settings';
import NewGameScreen from './newGame';

export const AvailableScreens: {
    [key in Screens]: {
        key: string;
        component: (props: any) => JSX.Element;
    }
} = {
    [Screens.Credits]: {
        key: Screens.Credits,
        component: CreditsScreen,
    },
    [Screens.MainMenu]: {
        key: Screens.MainMenu,
        component: MainMenuScreen,
    },
    [Screens.Game]: {
        key: Screens.Game,
        component: NewGameScreen,
    },
    [Screens.Settings]: {
        key: Screens.Settings,
        component: SettingsScreen,
    },
};
