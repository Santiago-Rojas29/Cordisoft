import React from 'react';

export default function BadgeStatus({ status }) {
    const getBadgeClass = (status) => {
        const lowerState = (status || "").toLowerCase();
        switch (lowerState) {
            case "pendiente": return "bg-warning text-dark";
            case "aprobada": return "bg-success";
            case "rechazada": return "bg-danger";
            case "activo": return "bg-primary";
            case "devuelto": return "bg-dark";
            default: return "bg-secondary";
        }
    };

    return (
        <span className={`badge ${getBadgeClass(status)}`}>
            {status}
        </span>
    );
}
