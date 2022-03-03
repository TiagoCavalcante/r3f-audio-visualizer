"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AnaylzerLivestream", {
  enumerable: true,
  get: function get() {
    return _analyzerLivestream.default;
  }
});
exports.default = void 0;

var _postprocessing = require("@react-three/postprocessing");

var _react = _interopRequireWildcard(require("react"));

var _fiber = require("@react-three/fiber");

var _analyzerLivestream = _interopRequireDefault(require("./analyzerLivestream"));

var _dataReactiveGrid = _interopRequireDefault(require("./dataReactiveGrid"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Equalizer(_ref) {
  let {
    amplitude = 1,
    backgroundColor = "",
    cubeSideLength = 0.03,
    cubeSpacingScalar = 4.5,
    cameraFov = 45,
    cameraPosition = [0, 5, 15],
    gridCols = 80,
    gridRows = 12,
    loadingFallback = null,
    onCreatedCallback = () => {}
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.Suspense, {
    fallback: loadingFallback
  }, /*#__PURE__*/_react.default.createElement(_fiber.Canvas, {
    mode: "concurrent",
    camera: {
      fov: cameraFov,
      position: cameraPosition,
      up: [0, 0, 1]
    },
    onCreated: onCreatedCallback
  }, backgroundColor !== "" ? /*#__PURE__*/_react.default.createElement("color", {
    attach: "background",
    args: [backgroundColor]
  }) : null, /*#__PURE__*/_react.default.createElement(_dataReactiveGrid.default, {
    amplitude: amplitude,
    cubeSideLength: cubeSideLength,
    cubeSpacingScalar: cubeSpacingScalar,
    gridCols: gridCols,
    gridRows: gridRows
  }), /*#__PURE__*/_react.default.createElement(_postprocessing.EffectComposer, null, /*#__PURE__*/_react.default.createElement(_postprocessing.Bloom, {
    kernelSize: 3,
    luminanceThreshold: 0,
    luminanceSmoothing: 0.4,
    intensity: 0.3
  }))));
}

Equalizer.propTypes = {
  amplitude: _propTypes.default.number,
  backgroundColor: _propTypes.default.string,
  cubeSideLength: _propTypes.default.number,
  cubeSpacingScalar: _propTypes.default.number,
  cameraFov: _propTypes.default.number,
  cameraPosition: _propTypes.default.array,
  gridCols: _propTypes.default.number,
  gridRows: _propTypes.default.number,
  loadingFallback: _propTypes.default.element,
  onCreatedCallback: _propTypes.default.func.isRequired
};
var _default = Equalizer;
exports.default = _default;