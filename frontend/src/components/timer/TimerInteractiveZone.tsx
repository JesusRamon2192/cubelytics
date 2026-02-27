import React from 'react';

interface TimerInteractiveZoneProps {
    children: React.ReactNode;
    onTriggerStart: () => void;
    onTriggerEnd: () => void;
}

export const TimerInteractiveZone: React.FC<TimerInteractiveZoneProps> = ({ children, onTriggerStart, onTriggerEnd }) => {
    
    const handleDown = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        onTriggerStart();
    };

    const handleUp = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        onTriggerEnd();
    };

    return (
        <div 
            className="timer-interactive-zone"
            onPointerDown={handleDown}
            onPointerUp={handleUp}
            onPointerCancel={handleUp}
            // Optional: prevent default visual behaviors on touch/drag
            onDragStart={(e) => e.preventDefault()}
        >
            {children}
        </div>
    );
};
