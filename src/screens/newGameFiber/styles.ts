import { makeStyles } from '@mui/styles';

import { SpacePalletColors } from '../../constans/tileColors';

export enum NewGameFiberStylesKeys {
    module = 'module',
    windowWrapper = 'windowWrapper',
    threeWrapper = 'threeWrapper',
    uiWrapper = 'uiWrapper'
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
}));
