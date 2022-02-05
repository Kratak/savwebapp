import { Dispatch } from 'react';
import { ClassNameMap } from '@mui/styles';
import { Vector3Tuple } from 'three/src/math/Vector3';

import { SettingCustomHandlesProps, SettingPassedValuesProps } from '../../UIcomponents/settings/settings';
import { GridPositionProps, TilesGridObject } from '../../gameModes/simple/helpers';

import { NewGameFiberStylesKeys } from './styles';
import { AvailableThemesKeys } from './initials';

export interface SelectedTilesData<ColorKeys extends string> {
    boxId: string;
    position: Vector3Tuple;
    gridPosition: GridPositionProps;
    color: ColorKeys;
}

export interface UseGameActionsReturn<ColorKeys extends string> {
    classes: ClassNameMap<NewGameFiberStylesKeys>;
    settings: {
        customHandles: SettingCustomHandlesProps<AvailableThemesKeys>;
        passedValues: SettingPassedValuesProps<AvailableThemesKeys>;
        open: boolean;
    };
    handlers: {
        setOpenSetting: Dispatch<boolean>;
        setTiles: Dispatch<Array<Array<TilesGridObject<ColorKeys>>>>
        deleteRow: (toDelete: { passedColumnIndex?: number; passedRowsIndex?: number; }) => void;
    };
    tiles: Array<Array<TilesGridObject<ColorKeys>>>;
    selectedTiles: [Array<SelectedTilesData<ColorKeys>>, Dispatch<Array<SelectedTilesData<ColorKeys>>>];
}
