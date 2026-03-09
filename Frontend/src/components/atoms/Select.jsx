import React from 'react';

const Select = ({ id, name, value, onChange, options, required = false, className = "", disabled = false }) => {
    return (
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`form-select shadow-none bg-light border-0 px-3 ${className}`}
            style={{ borderRadius: "10px", padding: "0.6rem" }}
        >
            <option value="">Seleccione</option>
            {options.map((opt, index) => (
                <option key={index} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    );
};

export default Select;
