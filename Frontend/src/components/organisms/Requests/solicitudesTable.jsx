import SolicitudesRow from "../../molecules/Requests/solicitudesRow"

export default function SolicitudesTable({
    lista,
    usuarios = [],
    onViewDetails,
    onApprove,
    onReject
}) {
    return(
        <div className="table-responsive shadow-sm rounded-4 bg-white p-2">
            <table className="table table-hover align-middle mb-0 text-center">

                <thead className="table-light text-secondary">
                    <tr>
                        <th>ID Solicitud</th>
                        <th>Instructor</th>
                        <th>Tipo</th>
                        <th>Fecha Creación</th>
                        <th>Fecha Entrega</th>
                        <th>Estado Global</th>
                        <th>Estado Préstamo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody className="border-top-0">

                    {lista.map((solicitud) => (
                        <SolicitudesRow
                            key={solicitud.id_solicitud}
                            solicitud={solicitud}
                            usuarios={usuarios}
                            onViewDetails={onViewDetails}
                            onApprove={onApprove}
                            onReject={onReject}
                        />
                    ))}

                    {lista.length === 0 && (
                        <tr>
                            <td colSpan="7" className="text-center py-4 text-muted">
                                No hay solicitudes registradas
                            </td>
                        </tr>
                    )}

                </tbody>

            </table>
        </div>
    )
}
