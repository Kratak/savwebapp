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

export interface HandlerDeleteProps {
    column?: {
        index: number;
        range?: Array<GridPositionProps>
    }
    row?: {
        index: number;
        range?: Array<GridPositionProps>
    }
}

export interface UseGameActionsReturn<ColorKeys extends string> {
    settings: {
        customHandles: SettingCustomHandlesProps<AvailableThemesKeys>;
        passedValues: SettingPassedValuesProps<AvailableThemesKeys>;
        open: boolean;
    };
    handlers: {
        setOpenSetting: Dispatch<boolean>;
        setReadyForCounting: Dispatch<boolean>;
        setTiles: Dispatch<Array<Array<TilesGridObject<ColorKeys>>>>
        tilesToDelete: (toDelete: HandlerDeleteProps) => void;
    };
    data: {
        displayData: {
            scoreCounters: Array<{ key: ColorKeys; value: number }>;
        };
        classes: ClassNameMap<NewGameFiberStylesKeys>;
        tiles: Array<Array<TilesGridObject<ColorKeys>>>;
        selectedTiles: [Array<SelectedTilesData<ColorKeys>>, Dispatch<Array<SelectedTilesData<ColorKeys>>>];
    };
}
