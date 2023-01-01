import { makeStyles } from '@mui/styles';
import { SpacePalletColors } from '../../constans/tileColors';

export const useStyles = makeStyles(() => ({
    module: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '130px 30px',
        backgroundColor: SpacePalletColors.Space + '99',
    },
}));
