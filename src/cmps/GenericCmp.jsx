import React, { useState } from 'react';

export function Backdrop({
    children,
    onClose,
    opacity = 0.5,
    borderRadius = '32px',
    width = 'auto',
    height = 'auto',
    backgroundColor = 'white',
    position = 'absolute',
    top = '50%',
    left = '50%',
    transform = 'translate(-50%, -50%)',
    boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)',
    right,
    bottom
}) {
    const [isClosing, setIsClosing] = useState(false);

    function handleClick(event) {
        event.stopPropagation(); // Prevent clicks inside the content from propagating
    }

    function handleClose() {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300); // Match the animation duration
    }

    const blockStyle = {
        borderRadius,
        width,
        height,
        backgroundColor,
        position,
        top,
        left,
        right,
        bottom,
        transform,
        boxShadow,
    };

    return (
        <div 
            className={`backdrop-container ${isClosing ? 'closing' : ''}`} 
            onClick={handleClose} 
            style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
        >
            <div className="backdrop-content" onClick={handleClick}>
                <div className="block" style={blockStyle}>
                    {children}
                </div>
            </div>
        </div>
    );
}
