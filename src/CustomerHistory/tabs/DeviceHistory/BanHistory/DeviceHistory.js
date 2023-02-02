import { useState } from 'react';
import { MessageBus } from '@ivoyant/component-message-bus';

export default function useDeviceHistory(
    ban,
    selectedImei,
    banHistoryWorkflow,
    datasources,
    setSelectedImei
) {
    const [imeiList, setImeiList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const {
        workflow,
        datasource,
        responseMapping,
        successStates,
        errorStates,
    } = banHistoryWorkflow;

    const handleImeiResponse = (successStates, errorStates) => (
        subscriptionId,
        topic,
        eventData,
        closure
    ) => {
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
                    setError(
                        eventData?.event?.data?.message || 'No history found!'
                    );
                }
                MessageBus.unsubscribe(subscriptionId + '.' + ban);
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
        MessageBus.send('WF.'.concat(workflow).concat('.INIT'), {
            header: {
                registrationId: registrationId,
                workflow: workflow,
                eventType: 'INIT',
            },
        });
        MessageBus.subscribe(
            registrationId,
            'WF.'.concat(workflow).concat('.STATE.CHANGE'),
            handleImeiResponse(successStates, errorStates)
        );
        MessageBus.send('WF.'.concat(workflow).concat('.SUBMIT'), {
            header: {
                registrationId: registrationId,
                workflow: workflow,
                eventType: 'SUBMIT',
            },
            body: {
                datasource: datasources[datasource],
                request: {
                    params: {
                        imei: selectedImei,
                    },
                },
                responseMapping,
            },
        });
    };
    return [fetchImeiList, imeiList, error, loading];
}
