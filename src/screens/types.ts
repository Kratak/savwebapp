import { GlobalDataProviderProps } from '../App';

export enum Screens {
    MainMenu = 'MainMenu',
    Settings = 'Settings',
    Credits = 'Credits',
    InGameSimpleBattlefield = 'InGameSimpleBattlefield',
    Loads = 'Loads'
}

export interface ScreenSelectorProps {
    globalData: GlobalDataProviderProps;
    setGlobalDataProvider: (globalData: GlobalDataProviderProps) => void;
    className: string;
}
