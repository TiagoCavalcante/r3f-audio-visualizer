"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _zustand = _interopRequireDefault(require("zustand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const useStore = (0, _zustand.default)(() => ({
  data: new Array(121)
}));
var _default = useStore;
exports.default = _default;