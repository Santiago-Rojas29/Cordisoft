import React from 'react';
import Label from "../atoms/Label";
import Select from "../atoms/Select";

const SelectField = ({ id, name, label, value, onChange, options, required, disabled }) => {
    return (
        <div className="mb-2">
            <Label htmlFor={id}>{label}</Label>
            <Select
                name={name}
                value={value}
                onChange={onChange}
                options={options}
                required={required}
                disabled={disabled}
            />
        </div>
    );
};

export default SelectField;
