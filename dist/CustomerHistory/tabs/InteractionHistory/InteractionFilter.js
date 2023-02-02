"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InteractionFilter;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  RangePicker
} = _antd.DatePicker;
const {
  Option
} = _antd.Select;
function InteractionFilter(_ref) {
  let {
    conversationOptions,
    filter,
    setFilter
  } = _ref;
  const onChangeFilter = (name, value) => {
    setFilter({
      ...filter,
      [name]: value
    });
  };
  const handleClear = () => {
    setFilter({
      searchText: '',
      dates: null,
      conversation: 'all'
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex flex-row justify-content-between"
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    value: filter.searchText,
    placeholder: "Search by CTN, tag or Chat Id",
    prefix: /*#__PURE__*/_react.default.createElement(_icons.SearchOutlined, {
      style: {
        color: 'rgba(0, 0, 0, 0.45)'
      }
    }),
    onChange: e => onChangeFilter('searchText', e.target.value),
    className: "interaction-history-search-box"
  }), /*#__PURE__*/_react.default.createElement(_antd.Space, {
    className: "interaction-history-filter-items",
    size: 10
  }, /*#__PURE__*/_react.default.createElement(RangePicker, {
    format: "YYYY-MM-DD",
    onChange: value => onChangeFilter('dates', value),
    value: filter.dates,
    style: {
      minwidth: 180
    }
  }), /*#__PURE__*/_react.default.createElement(_antd.Select, {
    defaultValue: filter.conversation,
    onChange: value => onChangeFilter('conversation', value),
    style: {
      width: 150
    }
  }, conversationOptions.map((item, index) => /*#__PURE__*/_react.default.createElement(Option, {
    value: item.value,
    key: index
  }, item.label))), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => handleClear()
  }, "Clear All")));
}
module.exports = exports.default;