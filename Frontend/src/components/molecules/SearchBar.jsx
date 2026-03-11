import React from 'react';
import Button from "../atoms/Button";
import Input from "../atoms/Input";

const SearchBar = ({ busqueda, setBusqueda }) => {
    return (
        <div className="d-flex gap-2">
            <Input
                type="text"
                placeholder="Buscar usuario..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{ width: "350px", borderRadius: "20px" }}
                className="form-control shadow-none bg-light border-0 px-3"
            />
        </div>
    );
};

export default SearchBar;