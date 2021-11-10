import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { LocalizationNS } from './nameSpaces/localizationMameSpaces';
import { ErrorMessagesNS } from './nameSpaces/errorMessages';

const resources = {
    en: {
        [LocalizationNS.translation]: {
            'Welcome to React': 'Welcome to React and react-i18next',
        },
        [LocalizationNS.part1]: {
            title: 'Some awsome title',
        },
        [LocalizationNS.errorMessages]: {
            [ErrorMessagesNS.screenNotHandled]: `This screen isn't handled yet`,
        },
    },
    pl: {
        [LocalizationNS.translation]: {
            'Welcome to React': 'Bienvenue à React et react-i18next',
        },
        [LocalizationNS.part1]: {
            title: 'Niesamowity tytuł',
        },
        [LocalizationNS.errorMessages]: {
            [ErrorMessagesNS.screenNotHandled]: 'Ten ekran nie jest jeszcze obsłużony',
        },
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // bind react-i18next to the instance
    .init({
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react!!
        },
        resources: { ...resources },
        // react i18next special options (optional)
        // override if needed - omit if ok with defaults
        /*
        react: {
          bindI18n: 'languageChanged',
          bindI18nStore: '',
          transEmptyNodeValue: '',
          transSupportBasicHtmlNodes: true,
          transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
          useSuspense: true,
        }
        */
    });
export default i18n;
