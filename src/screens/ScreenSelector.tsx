import React from 'react';
import { useTranslation } from 'react-i18next';
import { Screens, ScreenSelectorProps } from './types';
import { AvailableScreens } from './availableScreens';
import { LocalizationNS } from '../i18n/nameSpaces/localizationMameSpaces';
import { ErrorMessagesNS } from '../i18n/nameSpaces/errorMessages';


const ScreenSelector = (props: ScreenSelectorProps) => {
    const { t } = useTranslation();
    // const styles = useStyles();
    // if (props.selectedScreen === Screens.Settings) {
    //     return (
    //         <div>
    //             <h2 className={styles.module}>Settings</h2>
    //             <button onClick={() => props.setSelectedScreen(Screens.MainMenu)}>
    //                 Back to Main Menu
    //             </button>
    //         </div>
    //     );
    // }
    // if (props.selectedScreen === Screens.Game) {
    //     return (
    //         <div>
    //             <h2>'Game screen'</h2>
    //             <button onClick={() => props.setSelectedScreen(Screens.MainMenu)}>
    //                 Back to Main Menu
    //             </button>
    //         </div>
    //     );
    // }
    // if (props.selectedScree === Screens.Credits) {
    //     return (
    //         <CreditsScreen {...props} />
    //     );
    // }

    if (!AvailableScreens[props.selectedScreen]) {
        const errorMessage = t(ErrorMessagesNS.screenNotHandled, '', { ns: LocalizationNS.errorMessages });

        return <div>{errorMessage}</div>;
    }

    const Component = AvailableScreens[props.selectedScreen].component;

    const passedProps = {
        key: AvailableScreens[props.selectedScreen].key,
        ...props,
    };


    return (
        <div className={props.className}>
            <Component {...passedProps} />
        </div>
    );

};

export default ScreenSelector;
