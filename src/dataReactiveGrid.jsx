import React, { useEffect, useMemo, useRef } from "react";
import { Lut } from "three/examples/jsm/math/Lut.js";
import { Matrix4 } from "three/src/math/Matrix4";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";
import useStore from './store';

function getValueForNormalizedCoord(data, normalizedCoordinate) {
  // Interpolate from the bar values based on the normalized coordinate
  let rawIndex = normalizedCoordinate * (data.length - 1);
  let valueBelow = data[Math.floor(rawIndex)];
  let valueAbove = data[Math.ceil(rawIndex)];
  return valueBelow + (rawIndex % 1) * (valueAbove - valueBelow);
}

function DataReactiveGrid({
  amplitude,
  cubeSideLength,
  cubeSpacingScalar,
  gridCols,
  gridRows
}) {
  const mesh = useRef();

  const matrix = useMemo(() => new Matrix4(), []);

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
    const { data } = useStore.getState();
    const gridSizeX = gridRows * cubeSpacingScalar * cubeSideLength;
    const gridSizeY = gridRows * cubeSpacingScalar * cubeSideLength;
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
  cubeSideLength: PropTypes.number.isRequired,
  cubeSpacingScalar: PropTypes.number.isRequired,
  gridCols: PropTypes.number.isRequired,
  gridRows: PropTypes.number.isRequired
};

export default DataReactiveGrid;
