import { Screens, ScreenSelectorProps } from '../screens/types';

export const useInGameScreenPush = (props: ScreenSelectorProps) => {
    const gotToSelectedScreen = (screen: Screens) => {
        props.setGlobalDataProvider({ ...props.globalData, currentScreen: screen });
    };
    return {
        screenHandlers: {
            gotToSelectedScreen,
        },
    };
};
