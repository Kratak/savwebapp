import { makeStyles } from '@mui/styles';

import Backgrounds from '../../../assets/backgrounds/neutral_space_tile_background.jpg';
import { SpacePalletColors } from '../../../constans/tileColors';

export enum NewGameFiberStylesKeys {
    module = 'module',
    windowWrapper = 'windowWrapper',
    threeWrapper = 'threeWrapper',
    uiWrapper = 'uiWrapper',
    counters = 'counters',
    counter = 'counter',
    uiElementsWrapper = 'uiElementsWrapper',
    title = 'title',
    settingButton = 'settingButton'
}

export const useStyles = makeStyles(() => ({
    uiElementsWrapper: {
        backgroundColor: SpacePalletColors.WordleGreen,
        border: `solid 1px ${SpacePalletColors.WordleGrey}`,
        borderRadius: '10px 5px 10px 5px',
    },
    [NewGameFiberStylesKeys.module]: {
        width: 640,
        marginBottom: '3rem',
        backgroundImage: `url(${Backgrounds})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: 5
    },
    [NewGameFiberStylesKeys.windowWrapper]: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: 640,
        height: 680,
        backgroundColor: SpacePalletColors.Space + '05',
    },
    [NewGameFiberStylesKeys.threeWrapper]: {
        position: 'relative',
        width: 640,
        height: 480,
    },
    [NewGameFiberStylesKeys.uiWrapper]: {
        position: 'absolute',
        backgroundColor: SpacePalletColors.Space,
        padding: '2px 5px',
        width: 350,
        bottom: -50,
        left: 0,
    },
    counters: {
        alignSelf: 'center',
        padding: 5,
        width: 350,
        display: 'flex',
        backgroundColor: SpacePalletColors.Space,
        justifyContent: 'space-evenly',
    },
    counter: {
        borderRadius: 5,
        fontSize: 20,
        padding: 10,
        margin: 5,
    },
    title: {
        padding: '5px',
        textAlign: 'center',
        width: 350,
        fontSize: 12
    },
    settingButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: '5px 20px',
        backgroundColor: SpacePalletColors.Void,
        color: SpacePalletColors.Space,
        border: `solid 1px ${SpacePalletColors.Space}`,
        minWidth: 90,
        fontWeight: 700,
        textAlign: 'center',
        letterSpacing: '1px',
    },
}));
