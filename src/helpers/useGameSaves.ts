import { ScoreCounterProps } from '../screens/newGameFiber/types';
import { newDate, SaveSlotProps } from '../UIcomponents/settings/settings';

export interface MetaGameDataProps {
    shardCount: number;
}

export enum CurrentGameModes {
    galaxy = 'galaxy',
    match3 = 'match3'
}

export interface CurrentGameDataProps<ColorKeys extends string> {
    mode: CurrentGameModes;
    galaxyMapPosition: string;
    scoreCounters: Array<ScoreCounterProps<ColorKeys>>;

}

export enum SaveDataField {
    saveId = 'saveId',
    saveName = 'saveName',
    date = 'date',
    metaGameData = 'metaGameData',
    currentGameData = 'currentGameData'
}

export interface SaveDataProps<ColorKeys extends string> {
    [SaveDataField.saveId]: string;
    [SaveDataField.saveName]: string;
    [SaveDataField.date]: Date;
    [SaveDataField.metaGameData]: MetaGameDataProps;
    [SaveDataField.currentGameData]: CurrentGameDataProps<ColorKeys>;
}

export enum LocalStorageKeys {
    saves = 'saves'
}

export const useGameSaves = <ColorKeys extends string>() => {
    const save = async (saveData: SaveDataProps<ColorKeys>) => {
        let data = [saveData];
        const stringedOldSaves = await localStorage.getItem(LocalStorageKeys.saves);

        if (!!stringedOldSaves) {
            const oldSaves: Array<SaveDataProps<ColorKeys>> = JSON.parse(stringedOldSaves);

            if (saveData.saveId && !!oldSaves.filter(item => item.saveId === saveData.saveId)) {
                data = [...data, ...oldSaves.filter(item => item.saveId !== saveData.saveId)];
            }
        }

        localStorage.setItem(LocalStorageKeys.saves, JSON.stringify(data));
    };

    const load = (id: string): SaveDataProps<ColorKeys> => {
        console.log('game load');

        return {
            saveId: '',
            saveName: 'name',
            date: newDate,
            metaGameData: {
                shardCount: 0,
            },
            currentGameData: {
                galaxyMapPosition: 'position',
                mode: CurrentGameModes.match3,
                scoreCounters: [],
            },
        };
    };

    const getSaveSlot = async () => {
        let saveData: Array<SaveSlotProps> = [];
        const stringedOldSaves = await localStorage.getItem(LocalStorageKeys.saves);

        if (!!stringedOldSaves) {
            const oldSaves: Array<SaveDataProps<ColorKeys>> = JSON.parse(stringedOldSaves);
            saveData = oldSaves.map((item) => ({
                date: item.date,
                name: item.saveName,
                saveId: item.saveId,
            }));
        }

        return saveData;
    };

    return {
        save,
        load,
        getSaveSlot,
    };

};
