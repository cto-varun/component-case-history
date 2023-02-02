import React from 'react';
import Components from './tabs/AllComponents';

export default function CustomerHistory(props) {
    let { data, properties, parentProps } = props;
    let { componentToRender } = properties;

    const Cmp = Components[componentToRender];

    return (
        <>
            <Cmp
                {...props}
                data={{ ...properties.data, ...data.data }}
                datasources={parentProps?.datasources}
            />
        </>
    );
}
