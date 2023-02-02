"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeviceHistory;
var _react = _interopRequireWildcard(require("react"));
require("./styles.css");
var _DeviceFilter = _interopRequireDefault(require("./DeviceFilter"));
var _DeviceRow = _interopRequireDefault(require("./DeviceRow"));
var _antd = require("antd");
var _BanHistory = _interopRequireDefault(require("./BanHistory"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function DeviceHistory(props) {
  const {
    data,
    properties: {
      banHistoryWorkflow
    },
    datasources
  } = props;
  const [filterText, setFilterText] = (0, _react.useState)('');
  const {
    emptyDataMessage,
    deviceHistory
  } = data;
  const {
    history,
    totalPages
  } = deviceHistory[0];
  const [banHistoryPopup, setBanHistoryPopup] = (0, _react.useState)([]);
  const [banHistoryLoading, setBanHistoryLoading] = (0, _react.useState)(false);
  const [selectedImei, setSelectedImei] = (0, _react.useState)(null);
  const [showModal, setShowModal] = (0, _react.useState)(false);
  const filteredData = filterText !== '' ? history?.filter(_ref => {
    let {
      ctn
    } = _ref;
    return ctn.includes(filterText);
  }) : history;
  const showBanHistoryPopup = row => {
    setSelectedImei(row?.imei);
    setShowModal(true);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "device-history-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_BanHistory.default, {
    showModal: showModal,
    setShowModal: setShowModal,
    banHistoryWorkflow: banHistoryWorkflow,
    selectedImei: selectedImei,
    datasources: datasources,
    setSelectedImei: setSelectedImei
  }), /*#__PURE__*/_react.default.createElement(_DeviceFilter.default, {
    setFilterText: setFilterText
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "device-history-rows"
  }, filteredData && filteredData.length > 0 ? filteredData.map((row, index) => /*#__PURE__*/_react.default.createElement("div", {
    className: "device-history-row-wrapper",
    key: index
  }, /*#__PURE__*/_react.default.createElement(_DeviceRow.default, _extends({}, row, {
    clickHandler: () => showBanHistoryPopup(row)
  })))) : /*#__PURE__*/_react.default.createElement(_antd.Empty, {
    className: "empty-data-message-margin",
    description: emptyDataMessage
  })));
}
module.exports = exports.default;