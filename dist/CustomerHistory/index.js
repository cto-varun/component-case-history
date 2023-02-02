"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CustomerHistory;
var _react = _interopRequireDefault(require("react"));
var _AllComponents = _interopRequireDefault(require("./tabs/AllComponents"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function CustomerHistory(props) {
  let {
    data,
    properties,
    parentProps
  } = props;
  let {
    componentToRender
  } = properties;
  const Cmp = _AllComponents.default[componentToRender];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Cmp, _extends({}, props, {
    data: {
      ...properties.data,
      ...data.data
    },
    datasources: parentProps?.datasources
  })));
}
module.exports = exports.default;