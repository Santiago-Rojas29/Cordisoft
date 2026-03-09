import React from 'react';
import Label from "../atoms/Label";
import Input from "../atoms/Input";

const FormField = ({ id, name, label, type = "text", value, onChange, required, disabled }) => {
    return (
        <div className="mb-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className="shadow-none bg-light border-0 px-3"
                style={{ borderRadius: "10px", padding: "0.6rem" }}
            />
        </div>
    );
};

export default FormField;
