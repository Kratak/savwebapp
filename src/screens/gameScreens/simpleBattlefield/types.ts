import { Dispatch } from 'react';
import { ClassNameMap } from '@mui/styles';
import { Vector3Tuple } from 'three/src/math/Vector3';

import { SettingCustomHandlesProps, SettingPassedValuesProps } from '../../../UIcomponents/settings/settings';
import { GridPositionProps, TilesGridObject } from '../../../gameModes/simple/helpers';

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
        rows?: Array<number>
    }
    row?: {
        index: number;
        columns?: Array<number>
    }
}

export interface ScoreCounterProps<ColorKeys extends string> {
    key: ColorKeys;
    value: number
}

export interface DataToSaveProps<ColorKeys extends string> {
    scoreCounters: Array<ScoreCounterProps<ColorKeys>>;
    saveId: string | null;
}

export interface UseGameActionsReturn<ColorKeys extends string> {
    settings: {
        settingsHandlers: SettingCustomHandlesProps<AvailableThemesKeys>;
        passedValues: SettingPassedValuesProps<AvailableThemesKeys>;
        open: boolean;
        saveData: DataToSaveProps<ColorKeys>;
    };
    handlers: {
        setOpenSetting: Dispatch<boolean>;
        setReadyForCounting: Dispatch<boolean>;
        setTiles: Dispatch<Array<Array<TilesGridObject<ColorKeys>>>>
        tilesToDelete: (toDelete: HandlerDeleteProps) => void;
    };
    data: {
        displayData: {
            scoreCounters: Array<ScoreCounterProps<ColorKeys>>;
        };
        classes: ClassNameMap<NewGameFiberStylesKeys>;
        tiles: Array<Array<TilesGridObject<ColorKeys>>>;
        selectedTiles: [Array<SelectedTilesData<ColorKeys>>, Dispatch<Array<SelectedTilesData<ColorKeys>>>];
    };
}
