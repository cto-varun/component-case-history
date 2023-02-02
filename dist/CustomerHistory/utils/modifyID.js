"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifyID = modifyID;
/**
 *
 * @param {String} date CreatedAt
 * @returns {String} date and time with format
 */
function modifyID(ID) {
  const numerics = "#";
  const formattedID = ID && numerics.concat(ID);
  return formattedID;
}