import React from 'react';
import Button from "../atoms/Button";
import Input from "../atoms/Input";

const SearchBar = ({ value, onChange, onSearch }) => {
    return (
        <div className="d-flex gap-2">
            <Input
                type="text"
                placeholder="Buscar usuario..."
                value={value}
                onChange={onChange}
                style={{ width: "350px", borderRadius: "20px" }}
                className="form-control shadow-none bg-light border-0 px-3"
            />
            <Button variant="primary" size="sm" onClick={onSearch} className="rounded-pill px-4 shadow-sm">
                Buscar
            </Button>
        </div>
    );
};

export default SearchBar;