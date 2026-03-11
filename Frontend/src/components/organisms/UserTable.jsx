import React from 'react';
import Badge from "../atoms/Badge";
import UserTableActions from "../molecules/UserTableActions";
import Table from "./Table"; // <--- Importamos nuestro componente genérico

const UserTable = ({ lista, actualizarUsuario, eliminarUsuario }) => {

    // 1. Definimos cómo queremos que se vean y se comporten nuestras columnas
    const columns = [
        { label: "ID", accessor: "id_usuario" },
        { label: "Correo", accessor: "correo_electronico" },
        { label: "Identificación", accessor: "identificacion" },
        {
            label: "Nombre",
            accessor: "nombre",
            render: (usuario) => <span className="fw-medium">{usuario.nombre}</span>
        },
        { label: "Apellidos", accessor: "apellidos" },
        {
            label: "Estado",
            accessor: "estado",
            center: true,
            render: (usuario) => (
                <Badge variant={usuario.estado === 'activa' || usuario.estado === 'Activo' ? 'success' : 'danger'}>
                    {usuario.estado === 'activa' || usuario.estado === 'Activo' ? 'Activa' : 'Inactiva'}
                </Badge>
            )
        },
        {
            label: "ID (Rol)",
            accessor: "id_rol",
            center: true,
            render: (usuario) => (
                <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-3">
                    {usuario.id_rol}
                </span>
            )
        },
        {
            label: "Contraseña",
            accessor: "contraseña",
            render: (usuario) => (
                <span className="text-muted fst-italic">
                    {usuario.contraseña ? "••••••••" : "Sin descripción"}
                </span>
            )
        },
        {
            label: "Acción",
            accessor: "acciones",
            center: true,
            render: (usuario) => (
                <UserTableActions
                    onEdit={() => actualizarUsuario(usuario.id_usuario)}
                    onDelete={() => eliminarUsuario(usuario.id_usuario)}
                />
            )
        }
    ];

    return (
        <Table
            columns={columns}
            data={lista}
            keyField="id_usuario"
            emptyMessage="No hay Usuarios registrados"
        />
    );
};

export default UserTable;