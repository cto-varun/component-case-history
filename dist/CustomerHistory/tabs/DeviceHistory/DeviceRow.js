"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeviceRow;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _classnames = _interopRequireDefault(require("classnames"));
var _SharedComponents = require("../SharedComponents");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function DeviceRow(_ref) {
  let {
    category = 'MyCricket',
    imei,
    activityDateStr,
    networkType,
    phoneModel,
    ctn,
    sim,
    channel,
    deviceOrigin,
    activity,
    clickHandler
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "device-history-row d-flex flex-column"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex flex-row justify-content-between"
  }, /*#__PURE__*/_react.default.createElement(_antd.Space, {
    className: "d-flex align-items-center",
    size: 10
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('id-wrapper')
  }, "CTN : ", ctn)), /*#__PURE__*/_react.default.createElement(_antd.Space, {
    className: "d-flex align-items-center category-tags",
    size: 10
  }, /*#__PURE__*/_react.default.createElement(_antd.Tag, {
    color: "#E4F5DE"
  }, category))), /*#__PURE__*/_react.default.createElement("div", {
    className: "device-history-row-data d-flex flex-row flex-wrap"
  }, /*#__PURE__*/_react.default.createElement(_SharedComponents.RowItem, {
    title: "IMEI",
    content: imei,
    clickHandler: clickHandler
  }), /*#__PURE__*/_react.default.createElement(_SharedComponents.RowItem, {
    title: "Phone Model",
    content: phoneModel
  }), /*#__PURE__*/_react.default.createElement(_SharedComponents.RowItem, {
    title: "SIM",
    content: sim
  }), /*#__PURE__*/_react.default.createElement(_SharedComponents.RowItem, {
    title: "Channel",
    content: channel
  }), /*#__PURE__*/_react.default.createElement(_SharedComponents.RowItem, {
    title: "Device Origin",
    content: deviceOrigin
  }), /*#__PURE__*/_react.default.createElement(_SharedComponents.RowItem, {
    title: "Activity",
    content: activity
  }), /*#__PURE__*/_react.default.createElement(_SharedComponents.RowItem, {
    title: "Network Type",
    content: networkType
  }), /*#__PURE__*/_react.default.createElement(_SharedComponents.RowItem, {
    title: "Last Active Date",
    content: activityDateStr
  })));
}
module.exports = exports.default;