import React, { useEffect, useState } from 'react';

import shortid from 'shortid';
import { Row, Col, Button, Modal, Spin } from 'antd';

import useDeviceHistory from './DeviceHistory';

export default function BanHistory(props) {
    const {
        showModal = false,
        setShowModal,
        banHistoryWorkflow,
        selectedImei,
        datasources,
        setSelectedImei,
    } = props;

    const ban = window[sessionStorage.tabId]?.NEW_BAN;

    const [fetchImeiList, imeiList, error, loading] = useDeviceHistory(
        ban,
        selectedImei,
        banHistoryWorkflow,
        datasources,
        setSelectedImei
    );

    const modalFooter = () => {
        let footer = [];
        let closeButton = (
            <Button
                className="save-feedback-btn"
                type="primary"
                onClick={() => setShowModal(false)}
            >
                Close
            </Button>
        );
        footer.push(closeButton);
        return footer;
    };

    useEffect(() => {
        if (selectedImei) fetchImeiList();
    }, [selectedImei]);

    const modalTitle = (
        <Row className="ban-history-header">
            <Col>BANs Previously Active Under This Device</Col>
        </Row>
    );

    const getLayout = () => {
        if (loading)
            <Row>
                <Col
                    span={24}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Spin tip="Loading" size="default" />
                </Col>
            </Row>;
        if (error)
            return (
                <Row>
                    <Col
                        span={24}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#f00',
                        }}
                    >
                        {error}
                    </Col>
                </Row>
            );
        return (
            <>
                <Row className="ban-history-row">
                    <Col span={4}>BAN</Col>
                    <Col span={4}>CTN</Col>
                    <Col span={8}>SIM</Col>
                    <Col span={4}>Active Date</Col>
                    <Col span={4}>Activity</Col>
                </Row>

                {imeiList?.map((imeiRow) => {
                    return (
                        <Row
                            key={shortid.generate()}
                            className="ban-history-row"
                        >
                            <Col span={4}>{imeiRow?.ban}</Col>
                            <Col span={4}>{imeiRow?.ctn}</Col>
                            <Col span={8}>{imeiRow?.sim}</Col>
                            <Col span={4}>{imeiRow?.date}</Col>
                            <Col span={4}>{imeiRow?.activity}</Col>
                        </Row>
                    );
                })}
            </>
        );
    };

    return (
        <Modal
            open={showModal}
            onOk={() => console.log('Modal button pressed')}
            onCancel={() => setShowModal(false)}
            footer={modalFooter}
            centered
            width={700}
            title={modalTitle}
            className="ban-history-modal"
        >
            {getLayout()}
        </Modal>
    );
}
