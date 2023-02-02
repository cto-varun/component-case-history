import React from 'react';
import './styles.css';
import { CaseManagement } from '@ivoyant/component-case-management';

export default function CaseHistory({ data, datasources }) {
    const {
        metadata,
        caseHistory,
        reOpenStateDuration,
        editDisabledStates,
        caseManagementCSVHeaders,
        searchCasesWorkflow,
        updateCaseWorkflow,
        searchUsersWorkflow,
        customerInfoByQueryWorkflow,
        assignDispatchWorkflow,
        caseCategoriesConfig,
    } = data;

    return (
        <div className="case-history-wrapper">
            <div className="case-history-container">
                <CaseManagement
                    caseHistory={true}
                    properties={{
                        searchCasesWorkflow,
                        updateCaseWorkflow,
                        searchUsersWorkflow,
                        customerInfoByQueryWorkflow,
                        assignDispatchWorkflow,
                        caseCategoriesConfig,
                    }}
                    metadata={metadata}
                    datasources={datasources}
                    reOpenStateDuration={reOpenStateDuration}
                    editDisabledStates={editDisabledStates}
                    caseManagementCSVHeaders={caseManagementCSVHeaders}
                />
            </div>
        </div>
    );
}
