import { Bloom, EffectComposer } from "@react-three/postprocessing";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import AnaylzerLivestream from './analyzerLivestream';
import DataReactiveGrid from "./dataReactiveGrid";
import PropTypes from "prop-types";

function Equalizer({
  audioRef,
  cameraFov = 45,
  cameraPosition,
  gridCols = 80,
  gridRows = 12,
  setAnalyzer
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
      >
        <color attach="background" args={["black"]} />

        <DataReactiveGrid
          audioRef={audioRef}
          gridCols={gridCols}
          gridRows={gridRows}
          setAnalyzer={setAnalyzer}
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
  audioRef: PropTypes.any.isRequired,
  cameraFov: PropTypes.number,
  cameraPosition: PropTypes.array.isRequired,
  gridCols: PropTypes.number,
  gridRows: PropTypes.number,
  setAnalyzer: PropTypes.any.isRequired
};

export default Equalizer;

export { AnaylzerLivestream };
