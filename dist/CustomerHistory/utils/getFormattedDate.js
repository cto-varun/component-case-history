"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormattedDate = getFormattedDate;
/**
 *
 * @param {String} date CreatedAt
 * @returns {String} date and time with format
 */
function getFormattedDate(date) {
  const formattedDate = date && new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) + ', ' + new Date(date).toLocaleTimeString('en-US');
  return formattedDate;
}