import { SpacePalletColors } from '../../constans/tileColors';

export enum SimpleGameModeColorsKeys {
    red = 'red',
    blue = 'blue',
    yellow = 'yellow',
    purple = 'purple',
    green = 'green',
    white = 'white',
    WordleGreen = 'WordleGreen',
    WordleYellow = 'WordleYellow',
    WordleGrey = 'WordleGrey',
    WordleWhite = 'WordleWhite'
}

export const SimpleGameModeColors: { [key in SimpleGameModeColorsKeys]: string } = {
    [SimpleGameModeColorsKeys.red]: SpacePalletColors.RedDwarf,
    [SimpleGameModeColorsKeys.blue]: SpacePalletColors.SuperNova,
    [SimpleGameModeColorsKeys.yellow]: SpacePalletColors.YellowSun,
    [SimpleGameModeColorsKeys.purple]: SpacePalletColors.Gravitation,
    [SimpleGameModeColorsKeys.green]: SpacePalletColors.Regeneration,
    [SimpleGameModeColorsKeys.white]: SpacePalletColors.Space,
    [SimpleGameModeColorsKeys.WordleGreen]: SpacePalletColors.WordleGreen,
    [SimpleGameModeColorsKeys.WordleYellow]: SpacePalletColors.YellowSun,
    [SimpleGameModeColorsKeys.WordleGrey]: SpacePalletColors.WordleGrey,
    [SimpleGameModeColorsKeys.WordleWhite]: SpacePalletColors.WordleWhite,
};
