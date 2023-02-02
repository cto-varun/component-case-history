import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, Select, Space, Button } from 'antd';

const { RangePicker } = DatePicker;

const { Option } = Select;

export default function InteractionFilter({
    conversationOptions,
    filter,
    setFilter,
}) {
    const onChangeFilter = (name, value) => {
        setFilter({ ...filter, [name]: value });
    };

    const handleClear = () => {
        setFilter({ searchText: '', dates: null, conversation: 'all' });
    };

    return (
        <div className="d-flex flex-row justify-content-between">
            <Input
                value={filter.searchText}
                placeholder="Search by CTN, tag or Chat Id"
                prefix={
                    <SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
                }
                onChange={(e) => onChangeFilter('searchText', e.target.value)}
                className="interaction-history-search-box"
            />
            <Space className="interaction-history-filter-items" size={10}>
                <RangePicker
                    format="YYYY-MM-DD"
                    onChange={(value) => onChangeFilter('dates', value)}
                    value={filter.dates}
                    style={{ minwidth: 180 }}
                />
                <Select
                    defaultValue={filter.conversation}
                    onChange={(value) => onChangeFilter('conversation', value)}
                    style={{ width: 150 }}
                >
                    {conversationOptions.map((item, index) => (
                        <Option value={item.value} key={index}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
                <Button onClick={() => handleClear()}>Clear All</Button>
            </Space>
        </div>
    );
}
