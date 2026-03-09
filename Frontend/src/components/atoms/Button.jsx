import React from 'react';

const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
    const base = "btn";
    const variants = {
        primary: "btn-primary",
        danger: "btn-danger",
        success: "btn-success",
        warning: "btn-warning",
        info: "btn-info",
        outline: "btn-outline-primary"
    };

    const sizes = { sm: "btn-sm", md: "", lg: "btn-lg" };

    return (
        <button
            className={`${base} ${variants[variant] || "btn-primary"} ${sizes[size] || ""} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
