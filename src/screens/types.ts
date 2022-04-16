export enum Screens {
    MainMenu = 'MainMenu',
    Game = 'Game',
    Settings = 'Settings',
    Credits = 'Credits',
    GameFaber = 'GameFaber'
}

export interface ScreenSelectorProps {
    selectedScreen: Screens;
    setSelectedScreen: (screen: Screens) => void;
    className: string;
}
