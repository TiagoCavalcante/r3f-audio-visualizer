import PropTypes from 'prop-types';
import { RefObject } from 'react';

declare type EqualizerProps = {
    amplitude?: number;
    audio: RefObject<HTMLMediaElement>;
    backgroundColor?: string;
    cubeSideLength?: number;
    cubeSpacing?: number;
    cameraFov?: number;
    cameraPosition?: [number, number, number];
    gridRows?: number;
    gridCols?: number;
    loadingFallback?: JSX.Element;
    onCreatedCallback?: () => void;
};
declare function Equalizer({ amplitude, audio, backgroundColor, cubeSideLength, cubeSpacing, cameraFov, cameraPosition, gridCols, gridRows, loadingFallback, onCreatedCallback }: EqualizerProps): JSX.Element;
declare namespace Equalizer {
    var propTypes: {
        amplitude: PropTypes.Requireable<number>;
        audio: PropTypes.Validator<object>;
        backgroundColor: PropTypes.Requireable<string>;
        cubeSideLength: PropTypes.Requireable<number>;
        cubeSpacing: PropTypes.Requireable<number>;
        cameraFov: PropTypes.Requireable<number>;
        cameraPosition: PropTypes.Requireable<any[]>;
        gridCols: PropTypes.Requireable<number>;
        gridRows: PropTypes.Requireable<number>;
        loadingFallback: PropTypes.Requireable<PropTypes.ReactElementLike>;
        onCreatedCallback: PropTypes.Validator<(...args: any[]) => any>;
    };
}

export { Equalizer as default };
