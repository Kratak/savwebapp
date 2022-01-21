import { makeStyles } from '@mui/styles';
import { SpacePalletColors } from '../../constans/tileColors';

export const useStyles = makeStyles(() => ({
    module: {
        marginBottom: '3rem',
    },
    windowWrapper: {
        position: 'relative',
        width: 840,
        height: 680,
        backgroundColor: SpacePalletColors.Space + '55',
    },
    threeWrapper: {
        position: 'relative',
        width: 640,
        height: 480,
    },
}));
