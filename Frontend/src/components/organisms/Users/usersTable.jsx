import UserRow from "../../molecules/Users/userRow"

export default function UsersTable({
    lista,
    onEdit,
    onDelete
    }){

    return(

        <table className="table table-striped">

        <thead>

            <tr>

            <th>ID</th>
            <th>Correo</th>
            <th>Identificación</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Estado</th>
            <th>Rol</th>
            <th>Acciones</th>

            </tr>

        </thead>

        <tbody>

            {lista.map((usuario)=>(
            <UserRow
                key={usuario.id_usuario}
                usuario={usuario}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            ))}

        </tbody>

        </table>

    )

}