import { Dispatch } from 'react';
import { ClassNameMap } from '@mui/styles';
import { Vector3Tuple } from 'three/src/math/Vector3';

import { SettingCustomHandlesProps, SettingPassedValuesProps } from '../../UIcomponents/settings/settings';
import { GridPositionProps, TilesGridObject } from '../../gameModes/simple/helpers';
import { SimpleGameModeColorsKeys } from '../../gameModes/simple/colors';

import { NewGameFiberStylesKeys } from './styles';
import { AvailableThemesKeys } from './initials';

export interface SelectedTilesData {
    boxId: string;
    position: Vector3Tuple;
    gridPosition: GridPositionProps;
}

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
        deleteRow: (toDelete: { passedColumnIndex?: number; passedRowsIndex?: number; }) => void;
    };
    tiles: Array<Array<TilesGridObject<SimpleGameModeColorsKeys>>>;
    selectedTiles: [Array<SelectedTilesData>, Dispatch<Array<SelectedTilesData>>];
}
