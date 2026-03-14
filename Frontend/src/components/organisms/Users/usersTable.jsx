import UserRow from "../../molecules/Users/userRow"

export default function UsersTable({
    lista,
    onEdit,
    onDelete
    }){

    return(
        <div className="table-responsive shadow-sm rounded-4 bg-white p-2">
            <table className="table table-hover align-middle mb-0">

                <thead className="table-light text-secondary">

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

                <tbody className="border-top-0">

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
            </div>

        )

}