"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InteractionSummary;
var _react = _interopRequireWildcard(require("react"));
require("./styles.css");
var _utils = require("../../../utils");
var _antd = require("antd");
var _moment = _interopRequireDefault(require("moment"));
var _icons = require("@ant-design/icons");
var _shortid = _interopRequireDefault(require("shortid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  Panel
} = _antd.Collapse;

/* 
Truthy values check for UNIPHORE_ACCURACY.YES
Falsy values check for UNIPHORE_ACCURACY.NO
UNIPHORE_ACCURACY.ALMOST is Falsy because agent adds the correct summary
*/
const UNIPHORE_ACCURACY = {
  YES: 'yes',
  NO: 'no',
  ALMOST: 'almost'
};
function InteractionSummary(_ref) {
  let {
    selectedInteraction,
    selectedInteractionData,
    ban
  } = _ref;
  const category = selectedInteractionData?.category;
  const subCategory1 = selectedInteractionData?.subCategory1;
  const subCategory2 = selectedInteractionData?.subCategory2;
  const caseId = selectedInteractionData?.caseId;
  const selectedInteractionUniphoreSummary = selectedInteractionData?.uniphoreSummary?.length > 0 ? selectedInteractionData?.uniphoreSummary?.map(_ref2 => {
    let {
      label,
      body
    } = _ref2;
    return {
      label,
      body: body?.length > 0 ? body[0]?.split(',') : []
    };
  }) : [];
  const [showInnacuratetags, setShowInnacuratetags] = (0, _react.useState)(false);
  const SummaryTitle = () => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "call-summary-title"
    }, ' ', (selectedInteraction?.uniphoreDataAccurate === UNIPHORE_ACCURACY.NO || selectedInteraction?.uniphoreDataAccurate === UNIPHORE_ACCURACY.ALMOST) && 'Inaccurate', ' ', "Call Summary"));
  };
  const SummaryDropdown = _ref3 => {
    let {
      showDropdown,
      issue,
      resolution,
      troubleshootingData,
      customername,
      ctnData
    } = _ref3;
    return /*#__PURE__*/_react.default.createElement(_antd.Collapse, {
      bordered: false,
      expandIconPosition: "right",
      defaultActiveKey: showDropdown && ['1'],
      collapsible: showDropdown ? 'disabled' : ''
    }, /*#__PURE__*/_react.default.createElement(Panel, {
      header: /*#__PURE__*/_react.default.createElement(SummaryTitle, null),
      key: _shortid.default.generate(),
      showArrow: !showDropdown,
      collapsible: showDropdown ? 'disabled' : ''
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "interaction-summary"
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icons.ExclamationCircleOutlined, {
      className: "timeline-icon",
      style: {
        color: '#FF4D4F'
      }
    }), ' ', /*#__PURE__*/_react.default.createElement("span", {
      className: "summary-subtitle"
    }, "Reason for Call"))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("ul", null, issue?.body?.map((c, idx) => idx === 0 ? /*#__PURE__*/_react.default.createElement("li", {
      key: _shortid.default.generate()
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "primary-intent"
    }, c)) : /*#__PURE__*/_react.default.createElement("li", {
      key: _shortid.default.generate()
    }, c)))), troubleshootingData && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icons.ToolOutlined, {
      className: "timeline-icon",
      style: {
        color: '#52C41A'
      }
    }), ' ', /*#__PURE__*/_react.default.createElement("span", {
      className: "summary-subtitle"
    }, troubleshootingData?.label))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("ul", null, troubleshootingData?.body?.map((c, idx) => /*#__PURE__*/_react.default.createElement("li", {
      key: _shortid.default.generate()
    }, c))))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icons.CheckCircleOutlined, {
      className: "timeline-icon",
      style: {
        color: '#52C41A'
      }
    }), ' ', /*#__PURE__*/_react.default.createElement("span", {
      className: "summary-subtitle"
    }, "Resolution"))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("ul", null, resolution?.body?.map(r => /*#__PURE__*/_react.default.createElement("li", {
      key: _shortid.default.generate()
    }, r)))), customername && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
      className: "summary-subtitle"
    }, customername?.label)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("ul", null, customername?.body?.map((c, idx) => /*#__PURE__*/_react.default.createElement("li", {
      key: _shortid.default.generate()
    }, c))))), ctnData && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
      className: "summary-subtitle"
    }, ctnData?.label)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("ul", null, ctnData?.body?.map((c, idx) => /*#__PURE__*/_react.default.createElement("li", {
      key: _shortid.default.generate()
    }, c))))))));
  };
  const DisabledInput = _ref4 => {
    let {
      value
    } = _ref4;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Select, {
      className: "categories-dropdown",
      defaultValue: value,
      disabled: true
    }, /*#__PURE__*/_react.default.createElement(Option, null, category)));
  };
  const getIcon = (interactionSource, chatId) => {
    if (interactionSource === 'Voice') {
      return /*#__PURE__*/_react.default.createElement(_icons.AudioOutlined, {
        className: "interaction-icon"
      });
    } else if (interactionSource === 'Chat' && chatId) {
      return /*#__PURE__*/_react.default.createElement(_icons.MessageOutlined, {
        className: "interaction-icon"
      });
    } else if (interactionSource === "Manual") {
      return /*#__PURE__*/_react.default.createElement(_icons.FormOutlined, {
        className: "interaction-icon"
      });
    } else {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "interaction-details"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 12,
    className: "interaction-summary-header"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "interaction-id"
  }, "Interaction ID -", ' ', selectedInteraction?.interactionId)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: selectedInteraction?.uniphoreEnabled ? 7 : 10,
    className: "interaction-summary-header"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "summary-phonenumber"
  }, selectedInteraction?.phoneNumber)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: selectedInteraction?.uniphoreEnabled ? 5 : 2,
    className: "interaction-summary-header"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "interaction-source"
  }, getIcon(selectedInteraction?.interactionSource, selectedInteraction?.chatId), selectedInteraction?.uniphoreEnabled && /*#__PURE__*/_react.default.createElement("span", null, " Uniphore "))))), (selectedInteractionData?.uniphoreTags?.length > 0 || selectedInteractionData?.tags?.length > 0) && /*#__PURE__*/_react.default.createElement("div", {
    className: "all-tags"
  }, (selectedInteraction?.uniphoreDataAccurate === UNIPHORE_ACCURACY.NO || selectedInteraction?.uniphoreDataAccurate === UNIPHORE_ACCURACY.ALMOST) && selectedInteractionData?.tags?.length > 0 && selectedInteractionData?.tags?.map(agentTag => /*#__PURE__*/_react.default.createElement(_antd.Tag, {
    style: {
      backgroundColor: '#F6FFED',
      border: '0.5px solid #52C41A'
    },
    key: _shortid.default.generate(),
    className: "agent-tag"
  }, agentTag)), (selectedInteraction?.uniphoreDataAccurate === UNIPHORE_ACCURACY.YES || showInnacuratetags) && selectedInteractionData?.uniphoreTags?.length > 0 && selectedInteractionData?.uniphoreTags?.map(uniphoreTag => /*#__PURE__*/_react.default.createElement(_antd.Tag, {
    style: {
      backgroundColor: '#F0F0F0',
      border: '0.5px solid #8C8C8C'
    },
    key: _shortid.default.generate(),
    className: "uniphore-tag"
  }, uniphoreTag)), (selectedInteraction?.uniphoreDataAccurate === UNIPHORE_ACCURACY.NO || selectedInteraction?.uniphoreDataAccurate === UNIPHORE_ACCURACY.ALMOST) && selectedInteractionData?.uniphoreTags?.length > 0 && /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: '#1890FF'
    },
    onClick: () => setShowInnacuratetags(!showInnacuratetags)
  }, showInnacuratetags ? 'Hide' : '+', " Inaccurate Tags")), selectedInteractionUniphoreSummary?.length > 0 && /*#__PURE__*/_react.default.createElement(SummaryDropdown, {
    showDropdown: selectedInteraction?.uniphoreDataAccurate === UNIPHORE_ACCURACY.YES,
    issue: selectedInteractionUniphoreSummary?.find(_ref5 => {
      let {
        label
      } = _ref5;
      return label === "Reason for Call" || label === "Issue";
    }),
    resolution: selectedInteractionUniphoreSummary?.find(_ref6 => {
      let {
        label
      } = _ref6;
      return label === "Resolution";
    }),
    ctnData: selectedInteractionUniphoreSummary?.find(_ref7 => {
      let {
        label
      } = _ref7;
      return label === "CTN";
    }),
    customername: selectedInteractionUniphoreSummary?.find(_ref8 => {
      let {
        label
      } = _ref8;
      return label === "Customer Name";
    }),
    troubleshootingData: selectedInteractionUniphoreSummary?.find(_ref9 => {
      let {
        label
      } = _ref9;
      return label === "Recommendation or Troubleshooting step";
    })
  }), selectedInteractionData && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "category-dropdown-tags"
  }, category && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(DisabledInput, {
    value: category
  })), subCategory1 && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(DisabledInput, {
    value: subCategory1
  })), subCategory2 && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(DisabledInput, {
    value: subCategory2
  })))), (selectedInteraction?.uniphoreDataAccurate === UNIPHORE_ACCURACY.NO || selectedInteraction?.uniphoreDataAccurate === UNIPHORE_ACCURACY.ALMOST) && selectedInteraction?.interaction?.length > 0 && selectedInteractionData?.interactionSummary && /*#__PURE__*/_react.default.createElement("div", {
    className: "notes-section-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "notes-section"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "notes-header"
  }, "Agent Notes"), /*#__PURE__*/_react.default.createElement("div", {
    className: "notes-box"
  }, /*#__PURE__*/_react.default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: selectedInteractionData?.interactionSummary
    }
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "chatid-and-duration-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    lg: 16,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "chat-id-field"
  }, selectedInteraction?.interactionSource === 'Chat' && selectedInteraction?.chatId && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "chat-id-label"
  }, "Chat ID"), "  : ", /*#__PURE__*/_react.default.createElement("span", null, selectedInteraction?.chatId)))), selectedInteraction?.createdAt && selectedInteraction?.interaction[0]?.closedAt && /*#__PURE__*/_react.default.createElement(_antd.Col, {
    lg: 8,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "duration-field"
  }, _moment.default.tz((0, _moment.default)(selectedInteraction?.createdAt).format(), 'America/New_York').format('hh:mm a'), ' ', "-", ' ', _moment.default.tz((0, _moment.default)(selectedInteraction?.interaction[0]?.closedAt).format(), 'America/New_York').format('hh:mm a'), ' ')))), /*#__PURE__*/_react.default.createElement("div", {
    className: "summary-footer"
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, {
    justify: "space-evenly"
  }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 4,
    className: "summary-footer-col"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "summary-footer-label"
  }, "CSR ID"), /*#__PURE__*/_react.default.createElement("div", {
    className: "summary-footer-value"
  }, selectedInteraction.agentId)), selectedInteraction?.agentLocation && /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 4,
    className: "summary-footer-col"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "summary-footer-label"
  }, "Location"), /*#__PURE__*/_react.default.createElement("div", {
    className: "summary-footer-value"
  }, selectedInteraction?.agentLocation)), selectedInteraction?.agentVendor && /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 4,
    className: "summary-footer-col"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "summary-footer-label"
  }, "Vendor"), /*#__PURE__*/_react.default.createElement("div", {
    className: "summary-footer-value"
  }, selectedInteraction?.agentVendor)), caseId && /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 4,
    className: "summary-footer-col"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "summary-footer-label"
  }, "Case ID"), /*#__PURE__*/_react.default.createElement("div", {
    className: "summary-footer-value"
  }, caseId)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 4,
    className: "summary-footer-col"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "summary-footer-label"
  }, "BAN"), /*#__PURE__*/_react.default.createElement("div", {
    className: "summary-footer-value"
  }, ban)))));
}
module.exports = exports.default;