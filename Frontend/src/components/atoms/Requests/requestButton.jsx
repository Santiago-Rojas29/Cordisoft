import React from 'react';

export default function RequestButton({ onClick, label = "Detalle Solicitud" }) {
    return (
        <button
            className="btn btn-success fw-bold px-4 py-2 shadow-sm"
            style={{ borderRadius: "8px" }}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
