import { Vector3 } from '@react-three/fiber/dist/declarations/src/three-types';

const initialZ = 7;
const initialX = 0;
const initialY = 0;

const cameraPosition: Vector3 = [initialX, initialY, initialZ];

const gameSceneSize = {
    width: 640,
    height: 480,
};


export const initials = {
    camera: {
        cameraPosition,
        x: initialX,
        y: initialY,
        z: initialZ,
    },
    gameSceneSize,
};
