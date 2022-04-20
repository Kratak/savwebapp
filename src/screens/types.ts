import { GlobalDataProviderProps } from '../App';

export enum Screens {
    MainMenu = 'MainMenu',
    Game = 'Game',
    Settings = 'Settings',
    Credits = 'Credits',
    GameFaber = 'GameFaber',
    Loads = 'Loads'
}

export interface ScreenSelectorProps {
    globalData: GlobalDataProviderProps;
    setGlobalDataProvider: (globalData: GlobalDataProviderProps) => void;
    className: string;
}
