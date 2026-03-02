import Button from "../../Molecule/Atom/Button";

const UserTableActions = ({ onEdit, onDelete}) => {
    return (
        <div>
            <Button variant="info" size="sm" onClick={onEdit}>
                Editar
            </Button>

            <Button variant="danger" size="sm" onClick={onDelete}>
                Eliminar
            </Button>
        </div>
    );
};

export default UserTableActions