import { Bloom, EffectComposer } from "@react-three/postprocessing";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import DataReactiveGrid from "./dataReactiveGrid";
import PropTypes from "prop-types";

function Equalizer({ audioRef, cameraPosition }) {
  return (
    <Suspense fallback={null}>
      <Canvas
        mode="concurrent"
        camera={{
          fov: 45,
          position: cameraPosition,
          up: [0, 0, 1]
        }}
      >
        <color attach="background" args={["black"]} />

        <DataReactiveGrid audioRef={audioRef} />

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
  cameraPosition: PropTypes.array.isRequired
};

export default Equalizer;
