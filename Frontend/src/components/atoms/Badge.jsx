import React from 'react';

const Badge = ({ children, variant = "primary", className = "" }) => {
    const variants = {
        success: "bg-success",
        danger: "bg-danger",
        secondary: "bg-secondary"
    };

    return (
        <span className={`badge ${variants[variant] || 'bg-primary'} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
