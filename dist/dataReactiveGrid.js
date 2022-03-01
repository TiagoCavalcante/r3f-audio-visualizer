"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.math.hypot.js");

var _react = _interopRequireWildcard(require("react"));

var _analyzerLivestream = _interopRequireDefault(require("./analyzerLivestream"));

var _Lut = require("three/examples/jsm/math/Lut.js");

var _Matrix = require("three/src/math/Matrix4");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fiber = require("@react-three/fiber");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const cubeSideLength = 0.03,
      cubeSpacingScalar = 4.5;

function getValueForNormalizedCoord(data, normalizedCoordinate) {
  if (!data) return 0; // Interpolate from the bar values based on the normalized coordinate

  let rawIndex = normalizedCoordinate * (data.length - 1);
  let valueBelow = data[Math.floor(rawIndex)];
  let valueAbove = data[Math.ceil(rawIndex)];
  return valueBelow + rawIndex % 1 * (valueAbove - valueBelow);
}

function DataReactiveGrid(_ref) {
  let {
    audioRef,
    gridCols,
    gridRows,
    setAnalyzer
  } = _ref;
  const mesh = (0, _react.useRef)();
  const data = (0, _react.useMemo)(() => new Array(121), []);
  const matrix = (0, _react.useMemo)(() => new _Matrix.Matrix4(), []);
  const lut = (0, _react.useMemo)(() => new _Lut.Lut("cooltowarm"), []);
  (0, _react.useEffect)(() => {
    if (!audioRef.current || !data) return;
    setAnalyzer((0, _analyzerLivestream.default)({
      audioRef,
      data
    }));
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
  (0, _fiber.useFrame)(() => {
    const gridSizeX = gridRows * cubeSpacingScalar * cubeSideLength;
    const gridSizeY = gridRows * cubeSpacingScalar * cubeSideLength;
    const normQuadrantHypotenuse = Math.hypot(0.5, 0.5);

    for (let index = 0, row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const normGridX = row / gridRows;
        const normGridY = col / gridCols;
        const normRadialOffset = Math.hypot(normGridX - 0.5, normGridY - 0.5) / normQuadrantHypotenuse;
        mesh.current.setMatrixAt(index++, matrix.setPosition(gridSizeX * (normGridX - 0.5), gridSizeY * (normGridY - 0.5), getValueForNormalizedCoord(data, normRadialOffset)));
      }
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return /*#__PURE__*/_react.default.createElement("instancedMesh", {
    ref: mesh,
    castShadow: true,
    receiveShadow: true,
    args: [null, null, gridRows * gridCols]
  }, /*#__PURE__*/_react.default.createElement("boxGeometry", {
    args: [cubeSideLength, cubeSideLength, cubeSideLength]
  }), /*#__PURE__*/_react.default.createElement("meshBasicMaterial", null));
}

DataReactiveGrid.propTypes = {
  audioRef: _propTypes.default.any.isRequired,
  gridCols: _propTypes.default.number.isRequired,
  gridRows: _propTypes.default.number.isRequired,
  setAnalyzer: _propTypes.default.any.isRequired
};
var _default = DataReactiveGrid;
exports.default = _default;