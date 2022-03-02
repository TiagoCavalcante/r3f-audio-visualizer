"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _audiomotionAnalyzer = _interopRequireDefault(require("audiomotion-analyzer"));

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AnaylzerLivestream() {
  return new _audiomotionAnalyzer.default(undefined, {
    mode: 2,
    useCanvas: false,
    start: false,
    onCanvasDraw: instance => {
      _store.default.setState({
        data: instance.getBars().map(_ref => {
          let {
            value
          } = _ref;
          return value[0];
        })
      });
    }
  });
}

var _default = AnaylzerLivestream;
exports.default = _default;