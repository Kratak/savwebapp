export enum SpacePalletKey {
    Void = 'Void',
    Space = 'Space',
    Corruption = 'Corruption',
    SimpleHull = 'SimpleHull',
    Regeneration = 'Regeneration',
    Gravitation = 'Gravitation',
    RedDwarf = 'RedDwarf',
    SuperNova ='SuperNova',
    YellowSun ='YellowSun'
}

export const SpacePalletColors: { [key in SpacePalletKey]: string } = {
    [SpacePalletKey.Corruption]: '#28003E',
    [SpacePalletKey.Space]: '#D4DCEE',
    [SpacePalletKey.Gravitation]: '#5A2652',
    [SpacePalletKey.Regeneration]: '#35954C',
    [SpacePalletKey.Void]: '#000012',
    [SpacePalletKey.SimpleHull]: '#696B78',
    [SpacePalletKey.RedDwarf]: '#B74C36',
    [SpacePalletKey.SuperNova]: '#6ACFED',
    [SpacePalletKey.YellowSun]: '#F1F269',
};
