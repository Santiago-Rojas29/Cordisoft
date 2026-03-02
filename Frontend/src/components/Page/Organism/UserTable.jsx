import Badge from "./Atom/Badge";
import UserTableActions from "./Molecule/UserTableActions";

const UserTable = ({ lista, actualizarUsuario, eliminarUsuario }) => {
    return (
        <table className="table table-striped table-hover align-middle">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Correo</th>
                    <th>Identificación</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Estado</th>
                    <th>ID (Rol)</th>
                    <th>Contraseña</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {lista.leght === 0 ? (
                    <tr>
                        <td colSpan="9" className="text-center py-4">
                            No hay Usuarios registrado
                        </td>
                    </tr>
                ) : (
                    lista.map((usuario) => (
                        <tr key={usuario.id_usuario}>
                            <td>{usuario.id_usuario}</td>
                            <td>{usuario.correo_electronico}</td>
                            <td>{usuario.identificacion}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellidos}</td>
                            <td>
                                <Badge
                                 variant={
                                    usuario.estado === "activa"
                                    ? "success"
                                    : "danger"
                                 }
                                >
                                    {usuario.estado === "activa"
                                    ? "Activa"
                                    : "Inactiva"}
                                </Badge>
                            </td>
                            <td>{usuario.id_rol}</td>
                            <td>{usuario.contraseña || "Sin descripcion"}</td>
                            <td>
                                <UserTableActions
                                    onEdit={() => actualizarUsuario(usuario.id_usuario)                                        
                                    }
                                    onDelete={() => eliminarUsuario(usuario.id_usuario)
                                    }
                                />
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default UserTable