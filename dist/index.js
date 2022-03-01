"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _postprocessing = require("@react-three/postprocessing");

var _react = _interopRequireWildcard(require("react"));

var _fiber = require("@react-three/fiber");

var _dataReactiveGrid = _interopRequireDefault(require("./dataReactiveGrid"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Equalizer(_ref) {
  let {
    audioRef,
    cameraFov = 45,
    cameraPosition,
    gridCols = 80,
    gridRows = 12,
    setAnalyzer
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.Suspense, {
    fallback: null
  }, /*#__PURE__*/_react.default.createElement(_fiber.Canvas, {
    mode: "concurrent",
    camera: {
      fov: cameraFov,
      position: cameraPosition,
      up: [0, 0, 1]
    }
  }, /*#__PURE__*/_react.default.createElement("color", {
    attach: "background",
    args: ["black"]
  }), /*#__PURE__*/_react.default.createElement(_dataReactiveGrid.default, {
    audioRef: audioRef,
    gridCols: gridCols,
    gridRows: gridRows,
    setAnalyzer: setAnalyzer
  }), /*#__PURE__*/_react.default.createElement(_postprocessing.EffectComposer, null, /*#__PURE__*/_react.default.createElement(_postprocessing.Bloom, {
    kernelSize: 3,
    luminanceThreshold: 0,
    luminanceSmoothing: 0.4,
    intensity: 0.3
  }))));
}

Equalizer.propTypes = {
  audioRef: _propTypes.default.any.isRequired,
  cameraFov: _propTypes.default.number,
  cameraPosition: _propTypes.default.array.isRequired,
  gridCols: _propTypes.default.number,
  gridRows: _propTypes.default.number,
  setAnalyzer: _propTypes.default.any.isRequired
};
var _default = Equalizer;
exports.default = _default;