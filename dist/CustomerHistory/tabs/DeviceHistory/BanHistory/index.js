"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BanHistory;
var _react = _interopRequireWildcard(require("react"));
var _shortid = _interopRequireDefault(require("shortid"));
var _antd = require("antd");
var _DeviceHistory = _interopRequireDefault(require("./DeviceHistory"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function BanHistory(props) {
  const {
    showModal = false,
    setShowModal,
    banHistoryWorkflow,
    selectedImei,
    datasources,
    setSelectedImei
  } = props;
  const ban = window[sessionStorage.tabId]?.NEW_BAN;
  const [fetchImeiList, imeiList, error, loading] = (0, _DeviceHistory.default)(ban, selectedImei, banHistoryWorkflow, datasources, setSelectedImei);
  const modalFooter = () => {
    let footer = [];
    let closeButton = /*#__PURE__*/_react.default.createElement(_antd.Button, {
      className: "save-feedback-btn",
      type: "primary",
      onClick: () => setShowModal(false)
    }, "Close");
    footer.push(closeButton);
    return footer;
  };
  (0, _react.useEffect)(() => {
    if (selectedImei) fetchImeiList();
  }, [selectedImei]);
  const modalTitle = /*#__PURE__*/_react.default.createElement(_antd.Row, {
    className: "ban-history-header"
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, null, "BANs Previously Active Under This Device"));
  const getLayout = () => {
    if (loading) /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 24,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Spin, {
      tip: "Loading",
      size: "default"
    })));
    if (error) return /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 24,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f00'
      }
    }, error));
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Row, {
      className: "ban-history-row"
    }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 4
    }, "BAN"), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 4
    }, "CTN"), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 8
    }, "SIM"), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 4
    }, "Active Date"), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 4
    }, "Activity")), imeiList?.map(imeiRow => {
      return /*#__PURE__*/_react.default.createElement(_antd.Row, {
        key: _shortid.default.generate(),
        className: "ban-history-row"
      }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 4
      }, imeiRow?.ban), /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 4
      }, imeiRow?.ctn), /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 8
      }, imeiRow?.sim), /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 4
      }, imeiRow?.date), /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 4
      }, imeiRow?.activity));
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    open: showModal,
    onOk: () => console.log('Modal button pressed'),
    onCancel: () => setShowModal(false),
    footer: modalFooter,
    centered: true,
    width: 700,
    title: modalTitle,
    className: "ban-history-modal"
  }, getLayout());
}
module.exports = exports.default;