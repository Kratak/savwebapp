export enum Screens {
    MainMenu = 'MainMenu',
    Game = 'Game',
    Settings = 'Settings',
    Credits = 'Credits'
}

export interface ScreenSelectorProps {
    selectedScree: Screens;
    setSelectedScreen: (screen: Screens) => void;
}
