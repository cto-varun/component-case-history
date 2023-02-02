/**
 *
 * @param {String} createdAt CreatedAt
 * @param {String} closeAt closeAt
 * @returns {String} difference time
 */

export function getTimeDifference(createdAt, closeAt) {
    // get total seconds between the times
    let total = Math.abs(new Date(createdAt) - new Date(closeAt)) / 1000;
    let days = Math.floor(total / 86400);
    total -= days * 86400;
    let hours = Math.floor(total / 3600) % 24;
    total -= hours * 3600;
    let minutes = Math.floor(total / 60) % 60;
    total -= minutes * 60;
    let seconds = total % 60;

    return `${days !== 0 ? days + 'd : ' : ''} ${
        hours !== 0 ? hours + 'h : ' : ''
    } ${minutes > 10 ? minutes + 'm ' : '0' + minutes + 'm '} ${
        seconds < 10 && seconds ? ': 0' + seconds + 's' : ': ' + seconds + 's'
    }`;
}
