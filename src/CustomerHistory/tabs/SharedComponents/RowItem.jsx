import React from 'react';

export default function RowItem({ title, content, clickHandler }) {
    return (
        <div className="data-item">
            <div
                className={`data-item-header ${!content && 'row-item-margin'}`}
            >
                {title}
            </div>
            <div
                className="data-item-content"
                onClick={
                    clickHandler ? () => clickHandler(content) : () => null
                }
                style={{ cursor: clickHandler ? 'pointer' : 'auto' }}
            >
                {content}
            </div>
        </div>
    );
}
