/**
 *
 * @param {String} date CreatedAt
 * @returns {String} date and time with format
 */
export function modifyID(ID) {
  const numerics = "#";
  const formattedID =
    ID && numerics.concat(ID);

  return formattedID;
}
