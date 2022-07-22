import { makeStyles } from '@mui/styles';
import { SpacePalletColors } from '../../constans/tileColors';
import { firstSystemTiles } from './helepers';

export const useStyles = makeStyles(() => ({
    mainMenuWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
        backgroundColor: SpacePalletColors.SimpleHull + 99,
        overflow: 'overlay',
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
        minWidth: '920px',
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
        borderTop: '1px solid hsl(220, 75%, 75%)',
        borderBottom: '1px solid hsl(220, 75%, 75%)',
        textAlign: 'center',
        width: '67px',
        height: '116px',
        borderRadius: '20%/5%',
        '&:before, &:after': {
            width: '67px',
            height: '116px',
            borderRadius: '20%/5%',
            borderTop: '1px solid hsl(220, 75%, 75%)',
            borderBottom: '1px solid hsl(220, 75%, 75%)',
            backgroundColor: 'inherit',
            content: '\'\'',
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
    hovered: {
        transform: 'scale(1.055)',
        borderColor: 'green',
        '&:before, &:after': {
            borderColor: 'green',
        },
    },
    player: {
        position: 'absolute',
        color: 'red',
        backgroundColor: 'transparent',
        fontSize: '80px',
        zIndex: '10',
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
    [`${firstSystemTiles.endSystemTile.name}`]: {
        backgroundColor: firstSystemTiles.endSystemTile.color,
        color: SpacePalletColors.Space,
    },
    [`${firstSystemTiles.startSystemTile.name}`]: {
        backgroundColor: firstSystemTiles.startSystemTile.color,
    },
    [`${firstSystemTiles.smalAsteroidTile.name}`]: {
        backgroundColor: firstSystemTiles.smalAsteroidTile.color,
        color: SpacePalletColors.Space,
    },
    [`${firstSystemTiles.mediumAsteroidTile.name}`]: {
        backgroundColor: firstSystemTiles.mediumAsteroidTile.color,
    },
    [`${firstSystemTiles.normalFightEvent.name}`]: {
        backgroundColor: firstSystemTiles.normalFightEvent.color,
    },
    [`${firstSystemTiles.bossFightEvent.name}`]: {
        backgroundColor: firstSystemTiles.bossFightEvent.color,
    },
    [`${firstSystemTiles.normalAnomalyEvent.name}`]: {
        backgroundColor: firstSystemTiles.normalAnomalyEvent.color,
    },
    [`${firstSystemTiles.normalSpace.name}`]: {
        backgroundColor: firstSystemTiles.normalSpace.color,
        color: SpacePalletColors.Space,
    },
}));
