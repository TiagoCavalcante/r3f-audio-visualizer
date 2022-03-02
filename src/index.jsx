import { Bloom, EffectComposer } from "@react-three/postprocessing";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import AnaylzerLivestream from './analyzerLivestream';
import DataReactiveGrid from "./dataReactiveGrid";
import PropTypes from "prop-types";

function Equalizer({
  amplitude = 1,
  backgroundColor = "",
  cubeSideLength = 0.03,
  cubeSpacingScalar = 4.5,
  cameraFov = 45,
  cameraPosition = [0, 5, 15],
  gridCols = 80,
  gridRows = 12,
  onCreatedCallback = () => {}
}) {
  return (
    <Suspense fallback={null}>
      <Canvas
        mode="concurrent"
        camera={{
          fov: cameraFov,
          position: cameraPosition,
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
          cubeSideLength={cubeSideLength}
          cubeSpacingScalar={cubeSpacingScalar}
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
  backgroundColor: PropTypes.string,
  cubeSideLength: PropTypes.number,
  cubeSpacingScalar: PropTypes.number,
  cameraFov: PropTypes.number,
  cameraPosition: PropTypes.array,
  gridCols: PropTypes.number,
  gridRows: PropTypes.number,
  onCreatedCallback: PropTypes.func.isRequired
};

export default Equalizer;

export { AnaylzerLivestream };
