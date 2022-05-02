import React from 'react';
import { useThree } from '@react-three/fiber';
import { initials } from './initials';

interface UseCameraProps {
    cameraZoom: number;
}

const CameraProvider = ({ cameraZoom }: UseCameraProps) => {
    useThree((state) => {
        state.camera.position.set(initials.camera.x, initials.camera.y, cameraZoom);
    });

    return <></>;
};

export default CameraProvider;
