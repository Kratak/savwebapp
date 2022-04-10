
export interface MetaGameDataProps {
    shardCount: number;
}

export enum CurrentGameModes {
    galaxy = 'galaxy',
    match3 = 'match3'
}

export interface CurrentGameDataProps {
    mode: CurrentGameModes;
    galaxyMapPosition: string;

}

export enum SaveDataField {
    saveName = 'saveName',
    metaGameData = 'metaGameData',
    currentGameData = 'currentGameData'
}

export interface SaveDataProps {
    [SaveDataField.saveName]: string;
    [SaveDataField.metaGameData]: MetaGameDataProps;
    [SaveDataField.currentGameData]: CurrentGameDataProps;
}

export const useGameSaves = () => {
    const save = (data: SaveDataProps) => {
        console.log('gameSaved', data);
        alert('game saved');
    };

    const load = (id: string): SaveDataProps => {
        console.log('game load');

        return {
            saveName: 'name',
            metaGameData: {
                shardCount: 0,
            },
            currentGameData: {
                galaxyMapPosition: 'position',
                mode: CurrentGameModes.match3,
            },
        };
    };

    return {
        save,
        load,
    };

};
