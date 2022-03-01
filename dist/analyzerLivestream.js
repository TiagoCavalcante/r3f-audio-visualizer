"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _audiomotionAnalyzer = _interopRequireDefault(require("audiomotion-analyzer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AnaylzerLivestream(_ref) {
  let {
    audioRef,
    data
  } = _ref;
  return new _audiomotionAnalyzer.default(null, {
    source: audioRef.current,
    mode: 2,
    useCanvas: false,
    volume: 1,
    onCanvasDraw: instance => {
      instance.getBars().forEach((_ref2, index) => {
        let {
          value
        } = _ref2;
        return data[index] = value[0];
      });
    }
  });
}

var _default = AnaylzerLivestream;
exports.default = _default;