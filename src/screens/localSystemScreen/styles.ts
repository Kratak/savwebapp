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
            minWidth: '25rem',
            maxWidth: '30rem',
            marginBottom: '1.2rem',
            padding: '.9rem 3rem',
            fontWeight: 700,
            backgroundColor: SpacePalletColors.WordleWhite,
            color: SpacePalletColors.Void,
        },
    },
    wrapper: {
        color: 'hsl(0, 0%, 10%)',
        backgroundColor: 'hsl(0, 0%, 95%)',
        borderTop: '5px solid hsl(220, 50%, 75%)',
        maxWidth: '920px',
        margin: '0 auto',
        padding: '30px',
        bottom: 0,
        top: 0,
    },
    hexagon: {
        /* easy way: height is width * 1.732
        actual formula is 2*(width/(2*Math.tan(Math.PI/6)))
        remove border-radius for sharp corners on hexagons */
        position: 'relative',
        display: 'inline-block',
        /* left/right margin approx. 25% of .hexagon width + spacing */
        margin: '1px 18px',
        backgroundColor: 'hsl(220, 75%, 75%)',
        textAlign: 'center',
        width: '67px',
        height: '116px',
        borderRadius: '20%/5%',
        '&:before, &:after': {
            width: '67px',
            height: '116px',
            borderRadius: '20%/5%',
            backgroundColor: 'inherit',
            content: "''",
            position: 'absolute',
            left: 0,
        },
        '&:nth-child(even)': {
            /* top approx. 50% of .hexagon height + spacing */
            top: '59px',
        },
        '&:before': {
            transform: 'rotate(-60deg)',

        },
        '&:after': {
            transform: 'rotate(60deg)',
        },
    },
    hexagontent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '140%',
        fontSize: '1.4rem',
        lineHeight: 1.2,
        zIndex: 100,
    },
}));
