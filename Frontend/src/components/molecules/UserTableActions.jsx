import React from 'react';
import Button from "../atoms/Button";

const UserTableActions = ({ onEdit, onDelete }) => {
    return (
        <div className="d-flex justify-content-center gap-2">
            <Button variant="info" size="sm" onClick={onEdit}>
                Editar
            </Button>
            <Button variant="danger" size="sm" onClick={onDelete}>
                Eliminar
            </Button>
        </div>
    );
};

export default UserTableActions;