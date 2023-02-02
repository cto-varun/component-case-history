"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RowItem;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function RowItem(_ref) {
  let {
    title,
    content,
    clickHandler
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "data-item"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `data-item-header ${!content && 'row-item-margin'}`
  }, title), /*#__PURE__*/_react.default.createElement("div", {
    className: "data-item-content",
    onClick: clickHandler ? () => clickHandler(content) : () => null,
    style: {
      cursor: clickHandler ? 'pointer' : 'auto'
    }
  }, content));
}
module.exports = exports.default;