"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeviceFilter;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function DeviceFilter(_ref) {
  let {
    setFilterText
  } = _ref;
  const onChange = e => {
    setFilterText(e.target.value);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex flex-row justify-content-between"
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    placeholder: "Enter Device PTN to search",
    prefix: /*#__PURE__*/_react.default.createElement(_icons.SearchOutlined, {
      style: {
        color: 'rgba(0, 0, 0, 0.45)'
      }
    }),
    className: "device-history-search-box",
    onChange: onChange
  }));
}
module.exports = exports.default;