export enum Screens {
    MainMenu = 'MainMenu',
    Game = 'Game',
    Settings = 'Settings',
    Credits = 'Credits',
    GameFaber = 'GameFaber',
    Loads = 'Loads'
}

export interface ScreenSelectorProps {
    selectedScreen: Screens;
    setSelectedScreen: (screen: Screens) => void;
    className: string;
}
