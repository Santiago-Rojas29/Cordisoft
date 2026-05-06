import React, { useState, useEffect, useRef } from 'react';

export default function SearchableSelect({ 
    options, 
    value, 
    onChange, 
    name,
    placeholder = "Buscar...", 
    labelKey = "label", 
    valueKey = "value" 
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const selectedOption = options.find(opt => opt[valueKey] === value);
    const displayValue = selectedOption ? selectedOption[labelKey] : "";

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options.filter(option => 
        String(option[labelKey]).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option) => {
        if (name) {
            onChange({ target: { name, value: option[valueKey] } });
        } else {
            onChange(option[valueKey]);
        }
        setSearchTerm("");
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="position-relative w-100">
            <div 
                className="form-control d-flex justify-content-between align-items-center cursor-pointer bg-white"
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: 'pointer', minHeight: '38px' }}
            >
                <span className={displayValue ? "text-dark" : "text-muted"}>
                    {displayValue || placeholder}
                </span>
                <span className="text-secondary small">▼</span>
            </div>

            {isOpen && (
                <div 
                    className="position-absolute w-100 bg-white border rounded shadow-sm mt-1 z-index-dropdown"
                    style={{ zIndex: 1050, maxHeight: '200px', overflowY: 'auto' }}
                >
                    <div className="p-2 border-bottom sticky-top bg-white">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                        />
                    </div>
                    
                    <ul className="list-unstyled mb-0">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <li 
                                    key={index}
                                    className="p-2 dropdown-item cursor-pointer text-dark"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleSelect(option)}
                                    title={option[labelKey]}
                                >
                                    {option[labelKey]}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-muted small text-center">No hay coincidencias</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
