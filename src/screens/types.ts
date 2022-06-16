import { GlobalDataProviderProps } from '../App';

export enum Screens {
    MainMenu = 'MainMenu',
    NewGame = 'NewGame',
    Credits = 'Credits',
    Settings = 'Settings',
    Loads = 'Loads',
    InGameSimpleBattlefield = 'InGameSimpleBattlefield'
}

export interface ScreenSelectorProps {
    globalData: GlobalDataProviderProps;
    setGlobalDataProvider: (globalData: GlobalDataProviderProps) => void;
    className: string;
}
