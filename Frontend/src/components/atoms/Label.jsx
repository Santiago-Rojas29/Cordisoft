import React from 'react';

const Label = ({ htmlFor, children, className = "", style = {} }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`form-label fw-semibold text-secondary ${className}`}
            style={{ height: "auto", marginBottom: "0.25rem", ...style }}
        >
            {children}
        </label>
    );
};

export default Label;
