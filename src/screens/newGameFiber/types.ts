import { Dispatch } from 'react';
import { ClassNameMap } from '@mui/styles';

import { SettingCustomHandlesProps, SettingPassedValuesProps } from '../../UIcomponents/settings/settings';
import { TilesGridObject } from '../../gameModes/simple/helpers';
import { SimpleGameModeColorsKeys } from '../../gameModes/simple/colors';

import { NewGameFiberStylesKeys } from './styles';
import { AvailableThemesKeys } from './initials';

export interface UseGameActionsReturn {
    classes: ClassNameMap<NewGameFiberStylesKeys>;
    settings: {
        customHandles: SettingCustomHandlesProps<AvailableThemesKeys>;
        passedValues: SettingPassedValuesProps<AvailableThemesKeys>;
        open: boolean;
    };
    handlers: {
        setOpenSetting: Dispatch<boolean>;
        setTiles: Dispatch<Array<Array<TilesGridObject<SimpleGameModeColorsKeys>>>>
    };
    tiles: Array<Array<TilesGridObject<SimpleGameModeColorsKeys>>>;
    selectedTiles: [Array<string>, Dispatch<Array<string>>];
}
