import React, { useState } from 'react';
import './styles.css';
import DeviceFilter from './DeviceFilter';
import DeviceRow from './DeviceRow';
import { Empty } from 'antd';
import BanHistory from './BanHistory';

export default function DeviceHistory(props) {
    const {
        data,
        properties: { banHistoryWorkflow },
        datasources,
    } = props;

    const [filterText, setFilterText] = useState('');
    const { emptyDataMessage, deviceHistory } = data;
    const { history, totalPages } = deviceHistory[0];
    const [banHistoryPopup, setBanHistoryPopup] = useState([]);
    const [banHistoryLoading, setBanHistoryLoading] = useState(false);
    const [selectedImei, setSelectedImei] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const filteredData =
        filterText !== ''
            ? history?.filter(({ ctn }) => ctn.includes(filterText))
            : history;

    const showBanHistoryPopup = (row) => {
        setSelectedImei(row?.imei);
        setShowModal(true);
    };

    return (
        <div className="device-history-wrapper">
            <BanHistory
                showModal={showModal}
                setShowModal={setShowModal}
                banHistoryWorkflow={banHistoryWorkflow}
                selectedImei={selectedImei}
                datasources={datasources}
                setSelectedImei={setSelectedImei}
            />
            <DeviceFilter setFilterText={setFilterText} />
            <div className="device-history-rows">
                {filteredData && filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                        <div className="device-history-row-wrapper" key={index}>
                            <DeviceRow
                                {...row}
                                clickHandler={() => showBanHistoryPopup(row)}
                            />
                        </div>
                    ))
                ) : (
                    <Empty
                        className="empty-data-message-margin"
                        description={emptyDataMessage}
                    />
                )}
            </div>
        </div>
    );
}
