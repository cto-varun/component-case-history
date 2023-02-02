import React, { useState, useEffect } from 'react';
import './styles.css';
import { getTimeDifference } from '../../../utils';
import { Row, Col, Tag, Typography, Timeline, Select } from 'antd';
import moment from 'moment';
import {
    AudioOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
    MessageOutlined,
    FormOutlined,
    ToolOutlined
} from '@ant-design/icons';
import { Collapse } from 'antd';
import shortid from 'shortid';

const { Panel } = Collapse;

/* 
Truthy values check for UNIPHORE_ACCURACY.YES
Falsy values check for UNIPHORE_ACCURACY.NO
UNIPHORE_ACCURACY.ALMOST is Falsy because agent adds the correct summary
*/
const UNIPHORE_ACCURACY = {
    YES: 'yes',
    NO: 'no',
    ALMOST: 'almost',
};

export default function InteractionSummary({
    selectedInteraction,
    selectedInteractionData,
    ban,
}) {
    const category = selectedInteractionData?.category;
    const subCategory1 = selectedInteractionData?.subCategory1;
    const subCategory2 = selectedInteractionData?.subCategory2;
    const caseId = selectedInteractionData?.caseId;
    const selectedInteractionUniphoreSummary = selectedInteractionData?.uniphoreSummary?.length > 0 ? selectedInteractionData?.uniphoreSummary?.map(({label, body}) => {
        return {
            label,
            body : body?.length > 0 ? body[0]?.split(',') : []
        }
    }) : [];
    const [showInnacuratetags, setShowInnacuratetags] = useState(false);

    const SummaryTitle = () => {
        return (
            <>
                <div className="call-summary-title">
                    {' '}
                    {(selectedInteraction?.uniphoreDataAccurate ===
                        UNIPHORE_ACCURACY.NO ||
                        selectedInteraction?.uniphoreDataAccurate ===
                            UNIPHORE_ACCURACY.ALMOST) &&
                        'Inaccurate'}{' '}
                    Call Summary
                </div>
            </>
        );
    };

    const SummaryDropdown = ({ showDropdown, issue, resolution ,troubleshootingData, customername, ctnData}) => {
        return (
            <Collapse
                bordered={false}
                expandIconPosition="right"
                defaultActiveKey={showDropdown && ['1']}
                collapsible={showDropdown ? 'disabled' : ''}
            >
                <Panel
                    header={<SummaryTitle />}
                    key={shortid.generate()}
                    showArrow={!showDropdown}
                    collapsible={showDropdown ? 'disabled' : ''}
                >
                    <div className="interaction-summary">
                        <div>
                            <span>
                                <ExclamationCircleOutlined
                                    className="timeline-icon"
                                    style={{ color: '#FF4D4F' }}
                                />{' '}
                                <span className="summary-subtitle">Reason for Call</span>
                            </span>
                        </div>
                        <div>
                            <ul>
                                {issue?.body?.map((c, idx) =>
                                    idx === 0 ? (
                                        <li key={shortid.generate()}>
                                            <span className="primary-intent">
                                                {c}
                                            </span>
                                        </li>
                                    ) : (
                                        <li key={shortid.generate()}>{c}</li>
                                    )
                                )}
                            </ul>
                        </div>
                        {
                            troubleshootingData && (
                                <>
                                    <div>
                                        <span>
                                            <ToolOutlined
                                                className="timeline-icon"
                                                style={{ color: '#52C41A' }}
                                            />{' '}
                                            <span className="summary-subtitle">{troubleshootingData?.label}</span>
                                        </span>
                                    </div>
                                    <div>
                                        <ul>
                                            {troubleshootingData?.body?.map((c, idx) => <li key={shortid.generate()}>{c}</li>
                                            )}
                                        </ul>
                                    </div>
                                </>
                            )
                        }
                        <div>
                            <span>
                                <CheckCircleOutlined
                                    className="timeline-icon"
                                    style={{ color: '#52C41A' }}
                                />{' '}
                                <span className="summary-subtitle">
                                    Resolution
                                </span>
                            </span>
                        </div>
                        <div>
                            <ul>
                                {resolution?.body?.map((r) => (
                                    <li key={shortid.generate()}>{r}</li>
                                ))}
                            </ul>
                        </div>
                        {
                            customername && (
                                <>
                                    <div>
                                            <span className="summary-subtitle">{customername?.label}</span>
                                    </div>
                                    <div>
                                        <ul>
                                            {customername?.body?.map((c, idx) => <li key={shortid.generate()}>{c}</li>
                                            )}
                                        </ul>
                                    </div>
                                </>
                            )
                        }
                        {
                            ctnData && (
                                <>
                                    <div>
                                            <span className="summary-subtitle">{ctnData?.label}</span>
                                    </div>
                                    <div>
                                        <ul>
                                            {ctnData?.body?.map((c, idx) => <li key={shortid.generate()}>{c}</li>
                                            )}
                                        </ul>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </Panel>
            </Collapse>
        );
    };

    const DisabledInput = ({ value }) => (
        <>
            <Select
                className="categories-dropdown"
                defaultValue={value}
                disabled
            >
                <Option>{category}</Option>
            </Select>
        </>
    );


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

    return (
        <div className="interaction-details">
            <div>
                <Row>
                    <Col span={12} className="interaction-summary-header">
                        <span className="interaction-id">
                            Interaction ID -{' '}
                            {selectedInteraction?.interactionId}
                        </span>
                    </Col>
                    <Col
                        span={selectedInteraction?.uniphoreEnabled ? 7 : 10}
                        className="interaction-summary-header"
                    >
                        <span className="summary-phonenumber">
                            {selectedInteraction?.phoneNumber}
                        </span>
                    </Col>
                    <Col
                        span={selectedInteraction?.uniphoreEnabled ? 5 : 2}
                        className="interaction-summary-header"
                    >
                        <span className="interaction-source">
                            {getIcon(selectedInteraction?.interactionSource,selectedInteraction?.chatId)}
                            {selectedInteraction?.uniphoreEnabled && (
                                <span> Uniphore </span>
                            )}
                        </span>
                    </Col>
                </Row>
            </div>

            {(selectedInteractionData?.uniphoreTags?.length > 0 ||
                selectedInteractionData?.tags?.length > 0) && (
                <div className="all-tags">
                    {/* {!selectedInteraction?.uniphoreDataAccurate && */}
                    {(selectedInteraction?.uniphoreDataAccurate ===
                        UNIPHORE_ACCURACY.NO ||
                        selectedInteraction?.uniphoreDataAccurate ===
                            UNIPHORE_ACCURACY.ALMOST) &&
                        selectedInteractionData?.tags?.length > 0 &&
                        selectedInteractionData?.tags?.map((agentTag) => (
                            <Tag
                                style={{
                                    backgroundColor: '#F6FFED',
                                    border: '0.5px solid #52C41A',
                                }}
                                key={shortid.generate()}
                                className="agent-tag"
                            >
                                {agentTag}
                            </Tag>
                        ))}
                    {/* {(selectedInteraction?.uniphoreDataAccurate || */}
                    {(selectedInteraction?.uniphoreDataAccurate ===
                        UNIPHORE_ACCURACY.YES ||
                        showInnacuratetags) &&
                        selectedInteractionData?.uniphoreTags?.length > 0 &&
                        selectedInteractionData?.uniphoreTags?.map(
                            (uniphoreTag) => (
                                <Tag
                                    style={{
                                        backgroundColor: '#F0F0F0',
                                        border: '0.5px solid #8C8C8C',
                                    }}
                                    key={shortid.generate()}
                                    className="uniphore-tag"
                                >
                                    {uniphoreTag}
                                </Tag>
                            )
                        )}
                    {/* {!selectedInteraction?.uniphoreDataAccurate && */}
                    {(selectedInteraction?.uniphoreDataAccurate ===
                        UNIPHORE_ACCURACY.NO ||
                        selectedInteraction?.uniphoreDataAccurate ===
                            UNIPHORE_ACCURACY.ALMOST) &&
                        selectedInteractionData?.uniphoreTags?.length > 0 && (
                            <span
                                style={{ color: '#1890FF' }}
                                onClick={() =>
                                    setShowInnacuratetags(!showInnacuratetags)
                                }
                            >
                                {showInnacuratetags ? 'Hide' : '+'} Inaccurate
                                Tags
                            </span>
                        )}
                </div>
            )}

            {selectedInteractionUniphoreSummary?.length > 0 && (
                <SummaryDropdown
                    showDropdown={
                        selectedInteraction?.uniphoreDataAccurate ===
                        UNIPHORE_ACCURACY.YES
                    }
                    issue={selectedInteractionUniphoreSummary?.find(({label}) => label === "Reason for Call" || label === "Issue")}
                    resolution={selectedInteractionUniphoreSummary?.find(({label}) => label === "Resolution")}
                    ctnData = {selectedInteractionUniphoreSummary?.find(({label}) => label === "CTN")}
                    customername = {selectedInteractionUniphoreSummary?.find(({label}) => label === "Customer Name")}
                    troubleshootingData = {selectedInteractionUniphoreSummary?.find(({label}) => label === "Recommendation or Troubleshooting step")}
                />
            )}

            {selectedInteractionData && (
                <div>
                    <div className="category-dropdown-tags">
                        {category && (
                            <div>
                                <DisabledInput value={category} />
                            </div>
                        )}
                        {subCategory1 && (
                            <div>
                                <DisabledInput value={subCategory1} />
                            </div>
                        )}
                        {subCategory2 && (
                            <div>
                                <DisabledInput value={subCategory2} />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* {!selectedInteraction?.uniphoreDataAccurate && */}
            {(selectedInteraction?.uniphoreDataAccurate ===
                UNIPHORE_ACCURACY.NO ||
                selectedInteraction?.uniphoreDataAccurate ===
                    UNIPHORE_ACCURACY.ALMOST) &&
                selectedInteraction?.interaction?.length > 0 &&
                selectedInteractionData?.interactionSummary && (
                    <div className="notes-section-wrapper">
                        <div className="notes-section">
                            <div className="notes-header">Agent Notes</div>
                            <div className="notes-box">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            selectedInteractionData?.interactionSummary,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            
            <div className="chatid-and-duration-wrapper">
                <Row>
                    <Col lg={16} xs={12}>
                        <div className="chat-id-field">
                    {selectedInteraction?.interactionSource === 'Chat' && selectedInteraction?.chatId && (
                                <>
                               <span className="chat-id-label">Chat ID</span>  : <span>{selectedInteraction?.chatId}</span>
                    </>)
                    }</div>
                    </Col>
                    {
                        selectedInteraction?.createdAt &&
                        selectedInteraction?.interaction[0]?.closedAt && (
                            <Col lg={8} xs={12}>
                                <div className="duration-field">
                                    {moment.tz(moment(selectedInteraction?.createdAt).format(),'America/New_York').format('hh:mm a')}{' '}
                                           -{' '}
                                     {moment.tz(moment(selectedInteraction?.interaction[0]?.closedAt).format(),'America/New_York').format('hh:mm a')}{' '}
                                </div>
                                
                            </Col>
                        )
                    }
                    
                </Row>
            </div> 

            <div className="summary-footer">
                <Row justify="space-evenly">
                    <Col span={4} className="summary-footer-col">
                        <div className="summary-footer-label">CSR ID</div>
                        <div className="summary-footer-value">
                            {selectedInteraction.agentId}
                        </div>
                    </Col>
                    {selectedInteraction?.agentLocation && (
                        <Col span={4} className="summary-footer-col">
                            <div className="summary-footer-label">Location</div>
                            <div className="summary-footer-value">
                                {selectedInteraction?.agentLocation}
                            </div>
                        </Col>
                    )}
                    
                    {selectedInteraction?.agentVendor && (
                        <Col span={4} className="summary-footer-col">
                            <div className="summary-footer-label">Vendor</div>
                            <div className="summary-footer-value">
                            {selectedInteraction?.agentVendor}
                            </div>
                        </Col>
                    )}
                    {caseId && (
                        <Col span={4} className="summary-footer-col">
                            <div className="summary-footer-label">Case ID</div>
                            <div className="summary-footer-value">{caseId}</div>
                        </Col>
                    )}
                    <Col span={4} className="summary-footer-col">
                        <div className="summary-footer-label">BAN</div>
                        <div className="summary-footer-value">{ban}</div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
