/// <reference types="react" />
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import PropTypes from 'prop-types';

declare function AnaylzerLivestream(): AudioMotionAnalyzer;

declare function Equalizer({ amplitude, backgroundColor, cubeSideLength, cubeSpacingScalar, cameraFov, cameraPosition, gridCols, gridRows, loadingFallback, onCreatedCallback }: {
    amplitude?: number;
    backgroundColor?: string;
    cubeSideLength?: number;
    cubeSpacingScalar?: number;
    cameraFov?: number;
    cameraPosition?: number[];
    gridCols?: number;
    gridRows?: number;
    loadingFallback?: JSX.Element;
    onCreatedCallback?: () => void;
}): JSX.Element;
declare namespace Equalizer {
    var propTypes: {
        amplitude: PropTypes.Requireable<number>;
        backgroundColor: PropTypes.Requireable<string>;
        cubeSideLength: PropTypes.Requireable<number>;
        cubeSpacingScalar: PropTypes.Requireable<number>;
        cameraFov: PropTypes.Requireable<number>;
        cameraPosition: PropTypes.Requireable<any[]>;
        gridCols: PropTypes.Requireable<number>;
        gridRows: PropTypes.Requireable<number>;
        loadingFallback: PropTypes.Requireable<PropTypes.ReactElementLike>;
        onCreatedCallback: PropTypes.Validator<(...args: any[]) => any>;
    };
}

export { AnaylzerLivestream, Equalizer as default };
