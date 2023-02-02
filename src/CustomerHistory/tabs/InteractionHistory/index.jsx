import React, { useState, useEffect } from 'react';
import './styles.css';
import InteractionFilter from './InteractionFilter';
import InteractionSummary from './interactionSummary/interactionSummary'
import { useLocation } from 'react-router-dom';
import { getTimeDifference } from '../../utils';
import { Table, Row, Col, Tag, Tooltip, Button, Typography, Timeline, Select } from 'antd';
import moment from 'moment';
import {
    MessageOutlined,
    AudioOutlined,
    FormOutlined
} from '@ant-design/icons';
import groupBy from 'lodash.groupby';
import shortid from 'shortid';
const { Paragraph } = Typography;

export default function InteractionHistory({ data }) {
    const location = useLocation();
    const [filter, setFilter] = useState({
        searchText: '',
        dates: null,
        conversation: 'all',
    });
    const {
        conversationOptions,
        categoryOptions,
        emptyDataMessage,
        interactionHistory,
        className,
        noFilters,
        showBan,
    } = data;

    const [selectedInteraction, setSelectedInteration] = useState();
    const [selectedInteractionData, setSelectedInteractionData] = useState({})

    const [interactionsData, setInteractionsData] = useState(
        interactionHistory || {}
    );

    useEffect(() => {
        if (location?.state?.routeData) {
            if (location?.state?.routeData?.searchData && !interactionHistory) {
                setInteractionsData(
                    JSON.parse(location?.state?.routeData?.searchData)
                );
                window[window.sessionStorage?.tabId].NEW_BAN = null;
                window[sessionStorage.tabId].conversationId =
                    window[sessionStorage.tabId]?.sessionConversationId;
                window[window.sessionStorage?.tabId].NEW_CTN = null;
                window[window.sessionStorage?.tabId].authenticated = false;
                if (window[window.sessionStorage?.tabId].unauthenticate) {
                    window[window.sessionStorage?.tabId].unauthenticate();
                }
            }
        }
    }, [location?.key]);

    useEffect(() => {
        return () => {
            sessionStorage.removeItem('searchCustomer');
        };
    }, []);

    // Clear the state data for selected interaction if any change happens in interaction data list
    useEffect(() => {
        setSelectedInteration();
        setSelectedInteractionData({});
    }, [filter,interactionsData]);

    const columns = [
        {
            title: 'Interaction ID',
            dataIndex: 'interactionId',
            key: 'interactionId',
            fixed: 'left',
            render: (data) => (
                <div className="text-green text-bold">{data}</div>
            ),
        },
        {
            title: 'Created By',
            dataIndex: 'agentId',
            key: 'agentId',
        },
        {
            title: 'Interaction Start Time',
            dataIndex: 'createdAt',
            key: 'createdAt',
            minWidth: 186,
            render: (data) => (
                <>{data ? moment(data).format('MM/DD/YY h:mm:ss a') : 'N/A'}</>
            ),
        },
        {
            title: 'Duration',
            dataIndex: 'interaction',
            key: 'duration',
            render: (data, record) => (
                <>
                    {record?.createdAt && data?.length > 0 && data[0]?.closedAt
                        ? getTimeDifference(
                              record?.createdAt,
                              data[0]?.closedAt
                          )
                        : 'N/A'}
                </>
            ),
        },
        {
            title: 'Interaction Type',
            dataIndex: 'interactionSource',
            key: 'interactionSource',
        },
        {
            title: 'Customer Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (data) => <>{data ? data : 'N/A'}</>,
        },
        {
            title: 'Case Id',
            dataIndex: 'interaction',
            key: 'caseId',
            render: (data) =>
                data?.length > 1 &&
                data[1]?.caseId && (
                    <Tag
                        color="#E6F6FF"
                        style={{ color: 'black' }}
                        key={data[1].caseId}
                    >
                        {data[1]?.caseId}
                    </Tag>
                ),
        },
        {
            title: 'Category',
            dataIndex: 'interaction',
            key: 'category',
            render: (data) =>
                data?.length > 1 &&
                data[1]?.category && (
                    <Tag
                        color="#E6F6FF"
                        style={{ color: 'black' }}
                        key={data[1].category}
                    >
                        {data[1].category}
                    </Tag>
                ),
        },
        {
            title: 'Sub category 1',
            dataIndex: 'interaction',
            key: 'subCategory1',
            render: (data) =>
                data?.length > 1 &&
                data[1]?.subCategory1 && (
                    <Tag
                        color="#E4F5DE"
                        style={{ color: 'black' }}
                        key={data[1].subCategory1}
                    >
                        {data[1].subCategory1}
                    </Tag>
                ),
        },
        {
            title: 'Sub category 2',
            dataIndex: 'interaction',
            key: 'subCategory2',
            render: (data) =>
                data?.length > 1 &&
                data[1]?.subCategory2 && (
                    <Tag
                        color="#E4F5DE"
                        style={{ color: 'black' }}
                        key={data[1].subCategory2}
                    >
                        {data[1].subCategory2}
                    </Tag>
                ),
        },
        {
            title: 'Description',
            dataIndex: 'interaction',
            key: 'interactionSummary',
            render: (data) =>
                data?.length > 1 &&
                data[1]?.interactionSummary && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data[1]?.interactionSummary,
                        }}
                    />
                ),
        },
    ];

    // Check the date lies between two dates
    const checkDateBetweenDates = (date) => {
        let startDate = moment(new Date(filter.dates && filter.dates[0]))
            .subtract(1, 'days')
            .format('YYYY-MM-DD');
        let endDate = moment(new Date(filter.dates && filter.dates[1]))
            .add(1, 'days')
            .format('YYYY-MM-DD');
        let caseDate = moment(new Date(date)).format('YYYY-MM-DD');
        let inRange = moment(caseDate).isBetween(startDate, endDate);
        return inRange;
    };

    const ban = interactionsData?.billingAccountNumber;

    const getInteractionObjct = (interaction) =>{
        return interaction?.length > 1 && interaction[0]?.closedAt ? interaction[1] : interaction?.length > 0 ? interaction[0] : {}
    }

    const handleSelectInteraction = (data) => {
        setSelectedInteration(data);
        setSelectedInteractionData(
            getInteractionObjct(data?.interaction))
    }

    const checkForTags = (interaction=[], searchText='') => {
        let tempInteraction = getInteractionObjct(interaction);
        return tempInteraction?.uniphoreTags?.find(tag => tag.toLowerCase()?.includes(searchText?.toLowerCase())) ||
        tempInteraction?.tags?.find(tag => tag.toLowerCase()?.includes(searchText?.toLowerCase()))
        }

    const getIcon = (interactionSource,chatId) => {
        if(interactionSource === 'Voice')
        {
            return <AudioOutlined className="interaction-icon"/>
        }
        else if(interactionSource === 'Chat' && chatId)
        {
            return <MessageOutlined className="interaction-icon"/>
        }
        else if(interactionSource === "Manual")
        {
            return <FormOutlined className="interaction-icon"/>
        }
        else
        {
            return <></>
        }
    }

    const filteredData = interactionsData?.interactions
        ?.filter(
            (data) =>
                !filter?.searchText ||
                data?.phoneNumber?.toLowerCase()?.includes(filter?.searchText?.toLowerCase())  ||
                checkForTags(data?.interaction, filter?.searchText) ||
                data?.chatId?.toLowerCase()?.includes(filter?.searchText?.toLowerCase())
        )
        ?.filter(
            (data) =>
                filter?.conversation === 'all' ||
                (filter?.conversation === 'Uniphore' && data?.uniphoreEnabled) ||
                (data.interactionSource === filter?.conversation && !data?.uniphoreEnabled)
        )
        .filter(
            (item) => !filter?.dates || checkDateBetweenDates(item.createdAt)
        ).sort(function (left, right) {
            return moment(right.createdAt).diff(moment(left.createdAt))
        });

     // data grouped by months
     const filteredDataGroupByMonths = groupBy(filteredData, (item) => moment(item?.createdAt).format('MMMM YYYY'));

    const handleClick = () => {
        let values = {
            ban: ban,
            ctn:
                interactionsData?.interactions?.length > 0
                    ? interactionsData?.interactions[0]?.phoneNumber
                    : null,
            tabId: sessionStorage?.getItem('tabId'),
        };
        sessionStorage.removeItem('custAuth');
        sessionStorage.removeItem('searchCustomer');
        sessionStorage.setItem('searchCustomer', JSON.stringify(values));
        const win = window.open(`/`, '_blank');
        win.focus();
        setTimeout(() => {
            sessionStorage.removeItem('searchCustomer');
        }, 15000);
    };

    const getCategoryTags = (interaction) => {

        const interactionData = getInteractionObjct(interaction);
        return (<>
            {
                interactionData?.category && (<div>{interactionData?.category}</div>)
            }
            {
                interactionData?.subCategory1 && (<div>{interactionData?.subCategory1}</div>)
            }
            {
                interactionData?.subCategory2 && (<div>{interactionData?.subCategory2}</div>)
            }
            </>)
    } 

    return (
        <div className={`interaction-history-wrapper ${className}`}>
            {!noFilters && (
                <InteractionFilter
                    filter={filter}
                    setFilter={setFilter}
                    categoryOptions={categoryOptions || []}
                    conversationOptions={conversationOptions || []}
                />
            )}
            <div className="interaction-history-rows">
                {ban && ban !== 'N/A' && showBan && (
                    <Paragraph
                        style={{ display: 'flex', marginTop: 8 }}
                        copyable={{ text: ban }}
                    >
                        {ban?.includes('C') || (ban && isNaN(ban)) ? (
                            <div>Billing Account Number : {ban}</div>
                        ) : (
                            <>
                                <span style={{ marginTop: 4, fontWeight: 600 }}>
                                    Billing Account Number :
                                </span>
                                <Tooltip title={'Manage account in new tab'}>
                                    <Button
                                        type="link"
                                        onClick={() => handleClick()}
                                    >
                                        {ban}
                                    </Button>
                                </Tooltip>
                            </>
                        )}
                    </Paragraph>
                )}
                {/* <Table
                    columns={columns}
                    className="interaction-table"
                    dataSource={filteredData || []}
                    locale={{ emptyText: 'No interactions available' }}
                    scroll={{ x: true }}
                /> */}

                <div>
                    <Row>
                        <Col span={14} className="interaction-timeline-container">

                        {filteredData?.length === 0 && <div>No interactions available</div>}

                        {filteredData?.length > 0 && Object.keys(filteredDataGroupByMonths).map(function(keyName) {
                            return (
                                <React.Fragment key={shortid.generate()}>
                                <div className="interaction-month-wrapper">
                                    <div className="interaction-month">
                                        {keyName}
                                    </div>
                                </div>
                                 <Timeline mode='left'  className="interaction-timeline">
                                 {
                                     filteredDataGroupByMonths[keyName].map(data => (
                                         <Timeline.Item color="gray" label={moment(data?.createdAt).format('DD MMM')} key={shortid.generate()}>
                                             <div className="interaction-timeline-content-box" style={{border:selectedInteraction?.interactionId === data?.interactionId ? "1px solid #1890FF" : "1px solid #BFBFBF"}} onClick={()=>handleSelectInteraction(data)}>
                                                 <Row>
                                                     <Col span={8}>
                                                         <div className="phone-number">  
                                                         {data?.phoneNumber}
                                                         </div>
                                                         <div className="att-id">
                                                         {`ATTUID: ${data?.agentId}`}
                                                         </div>
                                                     </Col>
                                                     <Col span={4}>
                                                         <div className="interaction-source">

                                                             {getIcon(data?.interactionSource,data?.chatId)}

                                                             {data?.uniphoreEnabled && (<span>
                                                                {' '}
                                                                Uniphore
                                                                </span>)}
                                                         </div>
                                                     </Col>
                                                     <Col span={12} className="interaction-tags">
                                                         {getCategoryTags(data.interaction)}
                                                     </Col>
                                                 </Row>
                                             </div>
                                     </Timeline.Item>
                                     ))
                                 }
                             </Timeline> 
                            </React.Fragment>
                             
                            )
                        })}
                        </Col>

                        {selectedInteraction && (
                            <Col span={10} className="interaction-details-container">
                            {selectedInteraction && (<InteractionSummary
                                selectedInteraction={selectedInteraction}
                                selectedInteractionData={selectedInteractionData}
                                ban={ban}
                            />)}
                            </Col> )}
                      </Row>
            
                </div>
                </div>
        </div>
    );
}

