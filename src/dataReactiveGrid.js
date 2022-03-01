import React, { useEffect, useMemo, useRef, useState } from "react";
import AnaylzerLivestream from "./analyzerLivestream";
import { Lut } from "three/examples/jsm/math/Lut.js";
import { Matrix4 } from "three";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";

const nGridRows = 12, nGridCols = 100, cubeSideLength = 0.03, cubeSpacingScalar = 4.5;

function getValueForNormalizedCoord(data, normalizedCoordinate) {
  if (!data) return 0;

  // Interpolate from the bar values based on the normalized coordinate
  let rawIndex = normalizedCoordinate * (data.length - 1);
  let valueBelow = data[Math.floor(rawIndex)];
  let valueAbove = data[Math.ceil(rawIndex)];
  return valueBelow + (rawIndex % 1) * (valueAbove - valueBelow);
}

function DataReactiveGrid({ audioRef }) {
  const mesh = useRef();

  const [data, setData] = useState([]);

  const matrix = useMemo(() => new Matrix4(), []);
  const lut = useMemo(() => new Lut("cooltowarm"), []);

  useEffect(() => {
    if (!audioRef.current) return;

    AnaylzerLivestream({ audioRef, setData });

    const normQuadrantHypotenuse = Math.hypot(0.5, 0.5);

    for (let index = 0, row = 0; row < nGridRows; row++) {
      for (let col = 0; col < nGridCols; col++) {
        const normGridX = row / nGridRows;
        const normGridY = col / nGridCols;
        const normRadialOffset = Math.hypot(normGridX - 0.5, normGridY - 0.5) / normQuadrantHypotenuse;

        mesh.current.setColorAt(index++, lut.getColor(normRadialOffset));
      }
    }

    mesh.current.instanceColor.needsUpdate = true;
  }, [audioRef, lut]);

  useFrame(() => {
    const gridSizeX = nGridRows * cubeSpacingScalar * cubeSideLength;
    const gridSizeY = nGridCols * cubeSpacingScalar * cubeSideLength;
    const normQuadrantHypotenuse = Math.hypot(0.5, 0.5);

    for (let index = 0, row = 0; row < nGridRows; row++) {
      for (let col = 0; col < nGridCols; col++) {
        const normGridX = row / nGridRows;
        const normGridY = col / nGridCols;
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
      args={[null, null, nGridRows * nGridCols]}
    >
      <boxGeometry args={[cubeSideLength, cubeSideLength, cubeSideLength]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
}

DataReactiveGrid.propTypes = {
  audioRef: PropTypes.any.isRequired
};

export default DataReactiveGrid;
