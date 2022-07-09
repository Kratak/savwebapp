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
    buttonWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.2rem',
    },
    deleteIcon: {
        '&.MuiSvgIcon-root': {
            height: '4rem',
            width: '4rem',
            cursor: 'pointer',
        },
    },
    buttonsWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    actionButton: {
        '&.MuiButton-root': {
            fontSize: '2rem',
            width: '30rem',
            padding: '.9rem 3rem',
            fontWeight: 700,
            backgroundColor: SpacePalletColors.WordleWhite,
            color: SpacePalletColors.Void,
        },
    },
}));
