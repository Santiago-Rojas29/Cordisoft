import UserRow from "../../molecules/Materials/materialsRow"

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
                    <th>Nombre</th>
                    <th>Codigo</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Descripcion</th>
                    <th>ID (Area)</th>
                    <th>Cantidad</th>
                    <th>ID (Bodega)</th>
                    <th>ID (Ficha)</th>
                    <th>Acciones</th>

                    </tr>

                </thead>

                <tbody className="border-top-0">

                    {lista.map((material)=>(
                    <UserRow
                        key={material.id_material}
                        material={material}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                    ))}

                </tbody>

                </table>
            </div>

        )

}