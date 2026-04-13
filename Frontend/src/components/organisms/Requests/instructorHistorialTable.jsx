import React from 'react';
import InstructorHistorialRow from "../../molecules/Requests/instructorHistorialRow"

export default function InstructorHistorialTable({
    lista,
    onViewDetails,
    onReturn
}) {
    return(
        <div className="table-responsive shadow-sm rounded-4 bg-white p-2">
            <table className="table table-hover align-middle mb-0 text-center">

                <thead className="table-light text-secondary">
                    <tr>
                        <th>ID Solicitud</th>
                        <th>Tipo</th>
                        <th>Fecha Creación</th>
                        <th>Estado Solicitud</th>
                        <th>Estado Préstamo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody className="border-top-0">

                    {lista.map((solicitud) => (
                        <InstructorHistorialRow
                            key={solicitud.id_solicitud}
                            solicitud={solicitud}
                            onViewDetails={onViewDetails}
                            onReturn={onReturn}
                        />
                    ))}

                    {lista.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-muted">
                                No tienes solicitudes ni préstamos registrados
                            </td>
                        </tr>
                    )}

                </tbody>

            </table>
        </div>
    )
}
