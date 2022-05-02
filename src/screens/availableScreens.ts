import { Screens } from './types';
import CreditsScreen from './credits';
import MainMenuScreen from './mainMenu';
import SettingsScreen from './settings';
import { SimpleBattlefield } from './gameScreens';
import LoadsScreen from './loads';

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
    [Screens.Settings]: {
        key: Screens.Settings,
        component: SettingsScreen,
    },
    [Screens.Loads]: {
        key: Screens.Loads,
        component: LoadsScreen,
    },
    [Screens.InGameSimpleBattlefield]: {
        key: Screens.InGameSimpleBattlefield,
        component: SimpleBattlefield,
    },
};
