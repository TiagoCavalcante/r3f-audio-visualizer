import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import PropTypes from "prop-types";
import React, { RefObject, Suspense } from "react";
import DataReactiveGrid from "./dataReactiveGrid";

type EqualizerProps = {
  amplitude?: number;
  audio: RefObject<HTMLMediaElement>;
  backgroundColor?: string;
  cubeSideLength?: number;
  cubeSpacing?: number;
  cameraFov?: number;
  cameraPosition?: [number, number, number],
  gridRows?: number;
  gridCols?: number;
  loadingFallback?: JSX.Element;
  onCreatedCallback?: () => void;
};

function Equalizer({
  amplitude = 1,
  audio,
  backgroundColor = "",
  cubeSideLength = 0.03,
  cubeSpacing = 4.5,
  cameraFov = 45,
  cameraPosition = [0, 5, 15],
  gridCols = 80,
  gridRows = 12,
  loadingFallback = <></>,
  onCreatedCallback = () => {}
}: EqualizerProps) {
  return (
    <Suspense fallback={loadingFallback}>
      <Canvas
        camera={{
          fov: cameraFov,
          position: cameraPosition as [number, number, number],
          up: [0, 0, 1]
        }}
        onCreated={onCreatedCallback}
      >
        {
          backgroundColor !== ""
            ? <color attach="background" args={[backgroundColor]} />
            : null
        }

        <DataReactiveGrid
          amplitude={amplitude}
          audio={audio}
          cubeSideLength={cubeSideLength}
          cubeSpacing={cubeSpacing}
          gridCols={gridCols}
          gridRows={gridRows}
        />

        <EffectComposer>
          <Bloom
            kernelSize={3}
            luminanceThreshold={0}
            luminanceSmoothing={0.4}
            intensity={0.3}
          />
        </EffectComposer>
      </Canvas>
    </Suspense>
  );
}

Equalizer.propTypes = {
  amplitude: PropTypes.number,
  audio: PropTypes.object.isRequired,
  backgroundColor: PropTypes.string,
  cubeSideLength: PropTypes.number,
  cubeSpacing: PropTypes.number,
  cameraFov: PropTypes.number,
  cameraPosition: PropTypes.array,
  gridCols: PropTypes.number,
  gridRows: PropTypes.number,
  loadingFallback: PropTypes.element,
  onCreatedCallback: PropTypes.func
};

export default Equalizer;
