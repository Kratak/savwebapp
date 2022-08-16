import { ScoreCounterProps } from '../screens/gameScreens/simpleBattlefield/types';
import { newDate, SaveSlotProps } from '../UIcomponents/settings/settings';
import { ScreenSelectorProps } from '../screens/types';
import { useEffect } from 'react';
import { HexPositionParameters } from '../screens/localSystemScreen/helepers';

export interface MetaGameDataProps {
    shardCount: number;
}

export enum CurrentGameModes {
    galaxy = 'galaxy',
    match3 = 'match3'
}

export interface CurrentGameDataProps {
    mode: CurrentGameModes;
    galaxyMapPosition?: HexPositionParameters;
    // scoreCounters: Array<ScoreCounterProps<ColorKeys>>;

}

export enum SaveDataField {
    saveId = 'saveId',
    saveName = 'saveName',
    date = 'date',
    metaGameData = 'metaGameData',
    currentGameData = 'currentGameData'
}

export interface SaveDataProps {
    [SaveDataField.saveId]: string;
    [SaveDataField.saveName]: string;
    [SaveDataField.date]: Date;
    [SaveDataField.metaGameData]: MetaGameDataProps;
    [SaveDataField.currentGameData]: CurrentGameDataProps;
}

export enum LocalStorageKeys {
    saves = 'saves'
}

export const useGameSaves = (props: ScreenSelectorProps) => {
    const save = async (saveData: SaveDataProps) => {
        let data = [saveData];
        const stringedOldSaves = await localStorage.getItem(LocalStorageKeys.saves);

        if (!!stringedOldSaves) {
            const oldSaves: Array<SaveDataProps> = JSON.parse(stringedOldSaves);

            if (saveData.saveId && !!oldSaves.filter(item => item.saveId === saveData.saveId)) {
                data = [...data, ...oldSaves.filter(item => item.saveId !== saveData.saveId)];
            }
        }

        localStorage.setItem(LocalStorageKeys.saves, JSON.stringify(data));
    };

    const deleteSave = async (saveId: string) => {
        let data: Array<SaveDataProps> = [];
        const stringedOldSaves = await localStorage.getItem(LocalStorageKeys.saves);

        if (!!stringedOldSaves) {
            const oldSaves: Array<SaveDataProps> = JSON.parse(stringedOldSaves);

            if (saveId && oldSaves.length > 0) {
                data = [...oldSaves.filter(item => item.saveId !== saveId)];
            }
        }

        localStorage.setItem(LocalStorageKeys.saves, JSON.stringify(data));
    };

    const load = (id: string): SaveDataProps => {
        let data = null;
        console.log('game load');
        getSaveSlot().then(reponse => {
            if (reponse.find(item => item.saveId === id)) {
                data = reponse.find(item => item.saveId === id);
            }
        }).catch(e => console.log(e));

        if (!!data) {
            return data;
        }

        return {
            saveId: '',
            saveName: 'name',
            date: newDate,
            metaGameData: {
                shardCount: 0,
            },
            currentGameData: {
                mode: CurrentGameModes.match3,
                // scoreCounters: [],
            },
        };
    };

    const getSaveSlot = async () => {
        let saveData: Array<SaveSlotProps> = [];
        const stringedOldSaves = await localStorage.getItem(LocalStorageKeys.saves);

        if (!!stringedOldSaves) {
            const oldSaves: Array<SaveDataProps> = JSON.parse(stringedOldSaves);
            saveData = oldSaves.map((item) => ({
                date: item.date,
                name: item.saveName,
                saveId: item.saveId,
            }));
        }

        return saveData;
    };

    useEffect(() => {
        if (props.globalData.saving && !!props.globalData.currentSaveData.saveId && !!props.globalData.currentSaveData.saveName) {
            props.setGlobalDataProvider({ ...props.globalData, saving: false });
            save({
                [SaveDataField.currentGameData]: {
                    mode: props.globalData.currentSaveData.currentGameModes,
                    galaxyMapPosition: props.globalData.currentSaveData.sectorData?.playerPosition,
                },
                [SaveDataField.date]: newDate,
                [SaveDataField.saveId]: props.globalData.currentSaveData.saveId,
                [SaveDataField.saveName]: props.globalData.currentSaveData.saveName,
                [SaveDataField.metaGameData]: {
                    shardCount: props.globalData.currentSaveData.shardCount,
                },

            });
        }
    }, [props.globalData.saving, props.globalData.currentSaveData.saveId, props.globalData.currentSaveData.saveName]);

    return {
        save,
        load,
        deleteSave,
        getSaveSlot,
    };

};
