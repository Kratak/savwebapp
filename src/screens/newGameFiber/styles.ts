import { makeStyles } from '@mui/styles';

import { SpacePalletColors } from '../../constans/tileColors';

export enum NewGameFiberStylesKeys {
    module = 'module',
    windowWrapper = 'windowWrapper',
    threeWrapper = 'threeWrapper',
    uiWrapper = 'uiWrapper',
    counters = 'counters',
    counter = 'counter'
}

export const useStyles = makeStyles(() => ({
    [NewGameFiberStylesKeys.module]: {
        marginBottom: '3rem',
    },
    [NewGameFiberStylesKeys.windowWrapper]: {
        position: 'relative',
        width: 840,
        height: 680,
        backgroundColor: SpacePalletColors.Space + '55',
    },
    [NewGameFiberStylesKeys.threeWrapper]: {
        position: 'relative',
        width: 640,
        height: 480,
    },
    [NewGameFiberStylesKeys.uiWrapper]: {
        position: 'absolute',
        backgroundColor: SpacePalletColors.Space + '55',
        minWidth: 150,
        padding: 10,
        bottom: -50,
        left: 20,
    },
    counters: {
        padding: 5,
        display: 'flex',
        backgroundColor: SpacePalletColors.Space,
    },
    counter: {
        borderRadius: 5,
        fontSize: 20,
        padding: 10,
        margin: 5,
    },
}));
