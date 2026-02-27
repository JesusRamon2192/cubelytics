import React from 'react';
import { useSplitMode } from '../../hooks/useSplitMode';
import './SplitToggle.css';

export const SplitToggle: React.FC = () => {
    const { splitMode, toggleSplitMode } = useSplitMode();

    return (
        <div className="split-toggle-container" onClick={toggleSplitMode}>
            <span className="split-toggle-label">Split Mode</span>
            <div className={`split-toggle-switch ${splitMode ? 'active' : ''}`}>
                <div className="split-toggle-thumb" />
            </div>
        </div>
    );
};
