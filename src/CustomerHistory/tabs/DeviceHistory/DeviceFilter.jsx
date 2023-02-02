import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function DeviceFilter({ setFilterText }) {
    const onChange = (e) => {
        setFilterText(e.target.value);
    };
    return (
        <div className="d-flex flex-row justify-content-between">
            <Input
                placeholder="Enter Device PTN to search"
                prefix={
                    <SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
                }
                className="device-history-search-box"
                onChange={onChange}
            />
        </div>
    );
}
