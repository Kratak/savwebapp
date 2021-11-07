import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            'Welcome to React': 'Welcome to React and react-i18next',
        },
        part1: {
            title: 'Some awsome title',
        },
    },
    pl: {
        translation: {
            'Welcome to React': 'Bienvenue à React et react-i18next',
        },
        part1: {
            title: 'some awsome french title',
        },
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // bind react-i18next to the instance
    .init({
        fallbackLng: 'en',
        debug: true,
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
