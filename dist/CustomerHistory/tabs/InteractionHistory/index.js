"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InteractionHistory;
var _react = _interopRequireWildcard(require("react"));
require("./styles.css");
var _InteractionFilter = _interopRequireDefault(require("./InteractionFilter"));
var _interactionSummary = _interopRequireDefault(require("./interactionSummary/interactionSummary"));
var _reactRouterDom = require("react-router-dom");
var _utils = require("../../utils");
var _antd = require("antd");
var _moment = _interopRequireDefault(require("moment"));
var _icons = require("@ant-design/icons");
var _lodash = _interopRequireDefault(require("lodash.groupby"));
var _shortid = _interopRequireDefault(require("shortid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  Paragraph
} = _antd.Typography;
function InteractionHistory(_ref) {
  let {
    data
  } = _ref;
  const location = (0, _reactRouterDom.useLocation)();
  const [filter, setFilter] = (0, _react.useState)({
    searchText: '',
    dates: null,
    conversation: 'all'
  });
  const {
    conversationOptions,
    categoryOptions,
    emptyDataMessage,
    interactionHistory,
    className,
    noFilters,
    showBan
  } = data;
  const [selectedInteraction, setSelectedInteration] = (0, _react.useState)();
  const [selectedInteractionData, setSelectedInteractionData] = (0, _react.useState)({});
  const [interactionsData, setInteractionsData] = (0, _react.useState)(interactionHistory || {});
  (0, _react.useEffect)(() => {
    if (location?.state?.routeData) {
      if (location?.state?.routeData?.searchData && !interactionHistory) {
        setInteractionsData(JSON.parse(location?.state?.routeData?.searchData));
        window[window.sessionStorage?.tabId].NEW_BAN = null;
        window[sessionStorage.tabId].conversationId = window[sessionStorage.tabId]?.sessionConversationId;
        window[window.sessionStorage?.tabId].NEW_CTN = null;
        window[window.sessionStorage?.tabId].authenticated = false;
        if (window[window.sessionStorage?.tabId].unauthenticate) {
          window[window.sessionStorage?.tabId].unauthenticate();
        }
      }
    }
  }, [location?.key]);
  (0, _react.useEffect)(() => {
    return () => {
      sessionStorage.removeItem('searchCustomer');
    };
  }, []);

  // Clear the state data for selected interaction if any change happens in interaction data list
  (0, _react.useEffect)(() => {
    setSelectedInteration();
    setSelectedInteractionData({});
  }, [filter, interactionsData]);
  const columns = [{
    title: 'Interaction ID',
    dataIndex: 'interactionId',
    key: 'interactionId',
    fixed: 'left',
    render: data => /*#__PURE__*/_react.default.createElement("div", {
      className: "text-green text-bold"
    }, data)
  }, {
    title: 'Created By',
    dataIndex: 'agentId',
    key: 'agentId'
  }, {
    title: 'Interaction Start Time',
    dataIndex: 'createdAt',
    key: 'createdAt',
    minWidth: 186,
    render: data => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, data ? (0, _moment.default)(data).format('MM/DD/YY h:mm:ss a') : 'N/A')
  }, {
    title: 'Duration',
    dataIndex: 'interaction',
    key: 'duration',
    render: (data, record) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, record?.createdAt && data?.length > 0 && data[0]?.closedAt ? (0, _utils.getTimeDifference)(record?.createdAt, data[0]?.closedAt) : 'N/A')
  }, {
    title: 'Interaction Type',
    dataIndex: 'interactionSource',
    key: 'interactionSource'
  }, {
    title: 'Customer Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    render: data => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, data ? data : 'N/A')
  }, {
    title: 'Case Id',
    dataIndex: 'interaction',
    key: 'caseId',
    render: data => data?.length > 1 && data[1]?.caseId && /*#__PURE__*/_react.default.createElement(_antd.Tag, {
      color: "#E6F6FF",
      style: {
        color: 'black'
      },
      key: data[1].caseId
    }, data[1]?.caseId)
  }, {
    title: 'Category',
    dataIndex: 'interaction',
    key: 'category',
    render: data => data?.length > 1 && data[1]?.category && /*#__PURE__*/_react.default.createElement(_antd.Tag, {
      color: "#E6F6FF",
      style: {
        color: 'black'
      },
      key: data[1].category
    }, data[1].category)
  }, {
    title: 'Sub category 1',
    dataIndex: 'interaction',
    key: 'subCategory1',
    render: data => data?.length > 1 && data[1]?.subCategory1 && /*#__PURE__*/_react.default.createElement(_antd.Tag, {
      color: "#E4F5DE",
      style: {
        color: 'black'
      },
      key: data[1].subCategory1
    }, data[1].subCategory1)
  }, {
    title: 'Sub category 2',
    dataIndex: 'interaction',
    key: 'subCategory2',
    render: data => data?.length > 1 && data[1]?.subCategory2 && /*#__PURE__*/_react.default.createElement(_antd.Tag, {
      color: "#E4F5DE",
      style: {
        color: 'black'
      },
      key: data[1].subCategory2
    }, data[1].subCategory2)
  }, {
    title: 'Description',
    dataIndex: 'interaction',
    key: 'interactionSummary',
    render: data => data?.length > 1 && data[1]?.interactionSummary && /*#__PURE__*/_react.default.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: data[1]?.interactionSummary
      }
    })
  }];

  // Check the date lies between two dates
  const checkDateBetweenDates = date => {
    let startDate = (0, _moment.default)(new Date(filter.dates && filter.dates[0])).subtract(1, 'days').format('YYYY-MM-DD');
    let endDate = (0, _moment.default)(new Date(filter.dates && filter.dates[1])).add(1, 'days').format('YYYY-MM-DD');
    let caseDate = (0, _moment.default)(new Date(date)).format('YYYY-MM-DD');
    let inRange = (0, _moment.default)(caseDate).isBetween(startDate, endDate);
    return inRange;
  };
  const ban = interactionsData?.billingAccountNumber;
  const getInteractionObjct = interaction => {
    return interaction?.length > 1 && interaction[0]?.closedAt ? interaction[1] : interaction?.length > 0 ? interaction[0] : {};
  };
  const handleSelectInteraction = data => {
    setSelectedInteration(data);
    setSelectedInteractionData(getInteractionObjct(data?.interaction));
  };
  const checkForTags = function () {
    let interaction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let searchText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let tempInteraction = getInteractionObjct(interaction);
    return tempInteraction?.uniphoreTags?.find(tag => tag.toLowerCase()?.includes(searchText?.toLowerCase())) || tempInteraction?.tags?.find(tag => tag.toLowerCase()?.includes(searchText?.toLowerCase()));
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
  const filteredData = interactionsData?.interactions?.filter(data => !filter?.searchText || data?.phoneNumber?.toLowerCase()?.includes(filter?.searchText?.toLowerCase()) || checkForTags(data?.interaction, filter?.searchText) || data?.chatId?.toLowerCase()?.includes(filter?.searchText?.toLowerCase()))?.filter(data => filter?.conversation === 'all' || filter?.conversation === 'Uniphore' && data?.uniphoreEnabled || data.interactionSource === filter?.conversation && !data?.uniphoreEnabled).filter(item => !filter?.dates || checkDateBetweenDates(item.createdAt)).sort(function (left, right) {
    return (0, _moment.default)(right.createdAt).diff((0, _moment.default)(left.createdAt));
  });

  // data grouped by months
  const filteredDataGroupByMonths = (0, _lodash.default)(filteredData, item => (0, _moment.default)(item?.createdAt).format('MMMM YYYY'));
  const handleClick = () => {
    let values = {
      ban: ban,
      ctn: interactionsData?.interactions?.length > 0 ? interactionsData?.interactions[0]?.phoneNumber : null,
      tabId: sessionStorage?.getItem('tabId')
    };
    sessionStorage.removeItem('custAuth');
    sessionStorage.removeItem('searchCustomer');
    sessionStorage.setItem('searchCustomer', JSON.stringify(values));
    const win = window.open(`/`, '_blank');
    win.focus();
    setTimeout(() => {
      sessionStorage.removeItem('searchCustomer');
    }, 15000);
  };
  const getCategoryTags = interaction => {
    const interactionData = getInteractionObjct(interaction);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, interactionData?.category && /*#__PURE__*/_react.default.createElement("div", null, interactionData?.category), interactionData?.subCategory1 && /*#__PURE__*/_react.default.createElement("div", null, interactionData?.subCategory1), interactionData?.subCategory2 && /*#__PURE__*/_react.default.createElement("div", null, interactionData?.subCategory2));
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: `interaction-history-wrapper ${className}`
  }, !noFilters && /*#__PURE__*/_react.default.createElement(_InteractionFilter.default, {
    filter: filter,
    setFilter: setFilter,
    categoryOptions: categoryOptions || [],
    conversationOptions: conversationOptions || []
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "interaction-history-rows"
  }, ban && ban !== 'N/A' && showBan && /*#__PURE__*/_react.default.createElement(Paragraph, {
    style: {
      display: 'flex',
      marginTop: 8
    },
    copyable: {
      text: ban
    }
  }, ban?.includes('C') || ban && isNaN(ban) ? /*#__PURE__*/_react.default.createElement("div", null, "Billing Account Number : ", ban) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      marginTop: 4,
      fontWeight: 600
    }
  }, "Billing Account Number :"), /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: 'Manage account in new tab'
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "link",
    onClick: () => handleClick()
  }, ban)))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 14,
    className: "interaction-timeline-container"
  }, filteredData?.length === 0 && /*#__PURE__*/_react.default.createElement("div", null, "No interactions available"), filteredData?.length > 0 && Object.keys(filteredDataGroupByMonths).map(function (keyName) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: _shortid.default.generate()
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "interaction-month-wrapper"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "interaction-month"
    }, keyName)), /*#__PURE__*/_react.default.createElement(_antd.Timeline, {
      mode: "left",
      className: "interaction-timeline"
    }, filteredDataGroupByMonths[keyName].map(data => /*#__PURE__*/_react.default.createElement(_antd.Timeline.Item, {
      color: "gray",
      label: (0, _moment.default)(data?.createdAt).format('DD MMM'),
      key: _shortid.default.generate()
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "interaction-timeline-content-box",
      style: {
        border: selectedInteraction?.interactionId === data?.interactionId ? "1px solid #1890FF" : "1px solid #BFBFBF"
      },
      onClick: () => handleSelectInteraction(data)
    }, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 8
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "phone-number"
    }, data?.phoneNumber), /*#__PURE__*/_react.default.createElement("div", {
      className: "att-id"
    }, `ATTUID: ${data?.agentId}`)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 4
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "interaction-source"
    }, getIcon(data?.interactionSource, data?.chatId), data?.uniphoreEnabled && /*#__PURE__*/_react.default.createElement("span", null, ' ', "Uniphore"))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 12,
      className: "interaction-tags"
    }, getCategoryTags(data.interaction))))))));
  })), selectedInteraction && /*#__PURE__*/_react.default.createElement(_antd.Col, {
    span: 10,
    className: "interaction-details-container"
  }, selectedInteraction && /*#__PURE__*/_react.default.createElement(_interactionSummary.default, {
    selectedInteraction: selectedInteraction,
    selectedInteractionData: selectedInteractionData,
    ban: ban
  }))))));
}
module.exports = exports.default;