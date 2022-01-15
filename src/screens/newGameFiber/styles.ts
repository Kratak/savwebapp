import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
    module: {
        marginBottom: '3rem',
    },
    windowWrapper: {
        position: 'relative',
    },
    threeWrapper: {
        position: 'relative',
        width: 640,
        height: 480
    },
    uiWrapper: {
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
}));
