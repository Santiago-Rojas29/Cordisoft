import BodegasRow from "../../molecules/Bodegas/bodegasRow"

export default function BodegasTable({
    lista,
    areas,
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
                    <th>Ubicación</th>
                    <th>Estado</th>
                    <th>ID (Área)</th>
                    <th>Acciones</th>

                    </tr>

                </thead>

                <tbody className="border-top-0">

                    {lista.map((bodega)=>(
                    <BodegasRow
                        key={bodega.id_bodega}
                        bodega={bodega}
                        areas={areas}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                    ))}

                </tbody>

                </table>
            </div>

        )

}