import React from 'react';
import { Space, Tag } from 'antd';
import classnames from 'classnames';
import { RowItem } from '../SharedComponents';

export default function DeviceRow({
    category = 'MyCricket',
    imei,
    activityDateStr,
    networkType,
    phoneModel,
    ctn,
    sim,
    channel,
    deviceOrigin,
    activity,
    clickHandler,
}) {
    return (
        <div className="device-history-row d-flex flex-column">
            <div className="d-flex flex-row justify-content-between">
                <Space className="d-flex align-items-center" size={10}>
                    <div className={classnames('id-wrapper')}>CTN : {ctn}</div>
                </Space>
                <Space
                    className="d-flex align-items-center category-tags"
                    size={10}
                >
                    <Tag color="#E4F5DE">{category}</Tag>
                </Space>
            </div>
            <div className="device-history-row-data d-flex flex-row flex-wrap">
                <RowItem
                    title="IMEI"
                    content={imei}
                    clickHandler={clickHandler}
                />
                <RowItem title="Phone Model" content={phoneModel} />
                <RowItem title="SIM" content={sim} />
                <RowItem title="Channel" content={channel} />
                <RowItem title="Device Origin" content={deviceOrigin} />
                <RowItem title="Activity" content={activity} />
                <RowItem title="Network Type" content={networkType} />
                <RowItem title="Last Active Date" content={activityDateStr} />
            </div>
        </div>
    );
}
