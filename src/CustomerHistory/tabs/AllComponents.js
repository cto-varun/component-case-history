import React, { lazy } from 'react';

let Components = {};

Components['InteractionHistory'] = require('./InteractionHistory');
Components['CaseHistory'] = require('./CaseHistory');
Components['DeviceHistory'] = require('./DeviceHistory');

export default Components;
// const CaseHistory = lazy(() => { import('./CaseHistory') })
// const InteractionHistory = lazy(() => { import('./InteractionHistory') })

// export {
//     CaseHistory,
//     InteractionHistory
// }
