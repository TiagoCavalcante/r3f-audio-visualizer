import React, { useEffect, useMemo, useRef } from "react";
import AnaylzerLivestream from "./analyzerLivestream";
import { Lut } from "three/examples/jsm/math/Lut.js";
import { Matrix4 } from "three/src/math/Matrix4";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";

const cubeSideLength = 0.03, cubeSpacingScalar = 4.5;

function getValueForNormalizedCoord(data, normalizedCoordinate) {
  if (!data) return 0;

  // Interpolate from the bar values based on the normalized coordinate
  let rawIndex = normalizedCoordinate * (data.length - 1);
  let valueBelow = data[Math.floor(rawIndex)];
  let valueAbove = data[Math.ceil(rawIndex)];
  return valueBelow + (rawIndex % 1) * (valueAbove - valueBelow);
}

function DataReactiveGrid({ audioRef, gridCols, gridRows, setAnalyzer }) {
  const mesh = useRef();

  const data = useMemo(() => new Array(121), []);
  const matrix = useMemo(() => new Matrix4(), []);
  const lut = useMemo(() => new Lut("cooltowarm"), []);

  useEffect(() => {
    if (!audioRef.current || !data) return;

    setAnalyzer(AnaylzerLivestream({ audioRef, data }))

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
  }, [audioRef, data, gridRows, gridCols, lut, setAnalyzer]);

  useFrame(() => {
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
            getValueForNormalizedCoord(data, normRadialOffset)
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
  audioRef: PropTypes.any.isRequired,
  gridCols: PropTypes.number.isRequired,
  gridRows: PropTypes.number.isRequired,
  setAnalyzer: PropTypes.any.isRequired
};

export default DataReactiveGrid;
