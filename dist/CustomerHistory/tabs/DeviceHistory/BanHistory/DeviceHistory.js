"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useDeviceHistory;
var _react = require("react");
var _componentMessageBus = require("@ivoyant/component-message-bus");
function useDeviceHistory(ban, selectedImei, banHistoryWorkflow, datasources, setSelectedImei) {
  const [imeiList, setImeiList] = (0, _react.useState)([]);
  const [error, setError] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(true);
  const {
    workflow,
    datasource,
    responseMapping,
    successStates,
    errorStates
  } = banHistoryWorkflow;
  const handleImeiResponse = (successStates, errorStates) => (subscriptionId, topic, eventData, closure) => {
    try {
      const isSuccess = successStates.includes(eventData.value);
      const isError = errorStates.includes(eventData.value);
      if (isSuccess || isError) {
        if (isSuccess && eventData?.event?.data?.data?.history) {
          const imeiList = eventData?.event?.data?.data?.history;
          console.log('response data is', imeiList);
          setImeiList(imeiList);
          setError(null);
          setSelectedImei(null);
        }
        if (isError) {
          setError(eventData?.event?.data?.message || 'No history found!');
        }
        _componentMessageBus.MessageBus.unsubscribe(subscriptionId + '.' + ban);
      }
    } catch (err) {
      setError(eventData?.event?.data?.message || 'No history found!');
    } finally {
      setLoading(false);
    }
  };
  const fetchImeiList = () => {
    setLoading(true);
    const registrationId = workflow.concat('.').concat(ban);
    _componentMessageBus.MessageBus.send('WF.'.concat(workflow).concat('.INIT'), {
      header: {
        registrationId: registrationId,
        workflow: workflow,
        eventType: 'INIT'
      }
    });
    _componentMessageBus.MessageBus.subscribe(registrationId, 'WF.'.concat(workflow).concat('.STATE.CHANGE'), handleImeiResponse(successStates, errorStates));
    _componentMessageBus.MessageBus.send('WF.'.concat(workflow).concat('.SUBMIT'), {
      header: {
        registrationId: registrationId,
        workflow: workflow,
        eventType: 'SUBMIT'
      },
      body: {
        datasource: datasources[datasource],
        request: {
          params: {
            imei: selectedImei
          }
        },
        responseMapping
      }
    });
  };
  return [fetchImeiList, imeiList, error, loading];
}
module.exports = exports.default;