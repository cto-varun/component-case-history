"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CaseHistory;
var _react = _interopRequireDefault(require("react"));
require("./styles.css");
var _componentCaseManagement = require("@ivoyant/component-case-management");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function CaseHistory(_ref) {
  let {
    data,
    datasources
  } = _ref;
  const {
    metadata,
    caseHistory,
    reOpenStateDuration,
    editDisabledStates,
    caseManagementCSVHeaders,
    searchCasesWorkflow,
    updateCaseWorkflow,
    searchUsersWorkflow,
    customerInfoByQueryWorkflow,
    assignDispatchWorkflow,
    caseCategoriesConfig
  } = data;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "case-history-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "case-history-container"
  }, /*#__PURE__*/_react.default.createElement(_componentCaseManagement.CaseManagement, {
    caseHistory: true,
    properties: {
      searchCasesWorkflow,
      updateCaseWorkflow,
      searchUsersWorkflow,
      customerInfoByQueryWorkflow,
      assignDispatchWorkflow,
      caseCategoriesConfig
    },
    metadata: metadata,
    datasources: datasources,
    reOpenStateDuration: reOpenStateDuration,
    editDisabledStates: editDisabledStates,
    caseManagementCSVHeaders: caseManagementCSVHeaders
  })));
}
module.exports = exports.default;