import { useFrame } from "@react-three/fiber";
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import PropTypes from "prop-types";
import React, { RefObject, useEffect, useMemo, useRef } from "react";
import { InstancedMesh, Matrix4 } from 'three';
import { Lut } from "three/examples/jsm/math/Lut.js";

function getValueForNormalizedCoord(
  data: number[],
  normalizedCoordinate: number
) {
  // Interpolate from the bar values based on the normalized coordinate
  let rawIndex = normalizedCoordinate * (data.length - 1);
  let valueBelow = data[Math.floor(rawIndex)];
  let valueAbove = data[Math.ceil(rawIndex)];
  return valueBelow + (rawIndex % 1) * (valueAbove - valueBelow);
}

type DataGridProps = {
  amplitude: number;
  audio: RefObject<HTMLMediaElement>;
  cubeSideLength: number;
  cubeSpacing: number;
  gridCols: number;
  gridRows: number;
};

function DataReactiveGrid({
  amplitude,
  audio,
  cubeSideLength,
  cubeSpacing,
  gridCols,
  gridRows
}: DataGridProps) {
  const mesh = useRef<InstancedMesh>();

  const matrix = useMemo(() => new Matrix4(), []);
  const data = useMemo(() => new Array(121).fill(0), []);
  const analyzer = useMemo(() => {
    if (!data) return;

    return new AudioMotionAnalyzer(undefined, {
      mode: 2,
      useCanvas: false,
      start: true,
      onCanvasDraw: (instance) => {
        const bars = instance.getBars();

        bars.forEach(({ value }, index) => {
          data[index] = value[0];
        });
      }
    });
  }, [data]);

  useEffect(() => {
    if (!analyzer) return;
    if (!audio.current) return;

    analyzer.disconnectInput();
    analyzer.connectInput(audio.current);
  }, [analyzer, audio]);

  useEffect(() => {
    const lut = new Lut("cooltowarm");
    const normQuadrantHypotenuse = Math.hypot(0.5, 0.5);

    for (let index = 0, row = 0; row < gridCols; row++) {
      for (let col = 0; col < gridRows; col++) {
        const normGridX = row / gridCols;
        const normGridY = col / gridRows;
        const normRadialOffset = Math.hypot(normGridX - 0.5, normGridY - 0.5) / normQuadrantHypotenuse;

        mesh.current.setColorAt(index++, lut.getColor(normRadialOffset));
      }
    }

    mesh.current.instanceColor.needsUpdate = true;
  }, [gridRows, gridCols]);

  useFrame(() => {
    const gridSizeX = gridRows * cubeSpacing * cubeSideLength;
    const gridSizeY = gridRows * cubeSpacing * cubeSideLength;
    const normQuadrantHypotenuse = Math.hypot(0.5, 0.5);

    for (let index = 0, row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const normGridX = row / gridRows;
        const normGridY = col / gridCols;
        const normRadialOffset = Math.hypot(normGridX - 0.5, normGridY - 0.5) / normQuadrantHypotenuse;

        mesh.current.setMatrixAt(
          index++,
          matrix.setPosition(
            gridSizeX * (normGridX - 0.5),
            gridSizeY * (normGridY - 0.5),
            amplitude * getValueForNormalizedCoord(data, normRadialOffset)
          )
        );
      }
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={mesh}
      castShadow={true}
      receiveShadow={true}
      args={[null, null, gridRows * gridCols]}
    >
      <boxGeometry args={[cubeSideLength, cubeSideLength, cubeSideLength]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
}

DataReactiveGrid.propTypes = {
  amplitude: PropTypes.number.isRequired,
  audio: PropTypes.object.isRequired,
  cubeSideLength: PropTypes.number.isRequired,
  cubeSpacing: PropTypes.number.isRequired,
  gridCols: PropTypes.number.isRequired,
  gridRows: PropTypes.number.isRequired
};

export default DataReactiveGrid;
