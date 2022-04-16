import { makeStyles } from '@mui/styles';
import { SpacePalletColors } from '../../constans/tileColors';

export const useStyles = makeStyles(() => ({
    mainMenuWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
        backgroundColor: SpacePalletColors.SimpleHull + 99,
    },
    gameTitle: {
        fontSize: '4rem',
        color: SpacePalletColors.Corruption,
    },
    buttonsWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    actionButton: {
        '&.MuiButton-root': {
            fontSize: '2rem',
            maxWidth: '30rem',
            marginBottom: '1.2rem',
            padding: '.9rem 3rem',
            fontWeight: 700,
            backgroundColor: SpacePalletColors.WordleWhite,
            color: SpacePalletColors.Void,
        },
    },
}));
