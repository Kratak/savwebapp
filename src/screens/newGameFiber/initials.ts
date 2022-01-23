import { Vector3 } from '@react-three/fiber/dist/declarations/src/three-types';

import { SimpleGameModeColorsKeys } from '../../gameModes/simple/colors';

const initialZ = 7;
const initialX = 0;
const initialY = 0;

const cameraPosition: Vector3 = [initialX, initialY, initialZ];

const gameSceneSize = {
    width: 640,
    height: 480,
};


const colorsKeys: Array<SimpleGameModeColorsKeys> = [
    SimpleGameModeColorsKeys.blue,
    SimpleGameModeColorsKeys.yellow,
    SimpleGameModeColorsKeys.white,
    SimpleGameModeColorsKeys.red,
    SimpleGameModeColorsKeys.purple,
    SimpleGameModeColorsKeys.green,
];
const wordleKeys: Array<SimpleGameModeColorsKeys> = [
    SimpleGameModeColorsKeys.WordleGreen,
    SimpleGameModeColorsKeys.WordleGrey,
    SimpleGameModeColorsKeys.WordleWhite,
    SimpleGameModeColorsKeys.WordleYellow,
];

export enum AvailableThemesKeys {
    simple = 'simple',
    wordle = 'wordle'
}

export interface ColorThemeObject<ThemesKeys> {
    label: string;
    value: ThemesKeys;
}

const colorThemes: Array<ColorThemeObject<AvailableThemesKeys>> = [
    { label: 'colorThemes.simple.title', value: AvailableThemesKeys.simple },
    { label: 'colorThemes.wordle.title', value: AvailableThemesKeys.wordle },
];

const availableColorThemes = {
    [AvailableThemesKeys.simple]: colorsKeys,
    [AvailableThemesKeys.wordle]: wordleKeys,
};

export const initials = {
    camera: {
        cameraPosition,
        x: initialX,
        y: initialY,
        z: initialZ,
    },
    gameSceneSize,
    availableColorThemes,
    colorThemes
};
