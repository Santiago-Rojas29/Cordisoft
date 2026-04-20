import { useState } from "react";
import SolicitudesRow from "../../molecules/Requests/solicitudesRow"
import PaginationControl from "../../molecules/Shared/PaginationControl"

export default function SolicitudesTable({
    lista,
    usuarios = [],
    onViewDetails,
    onApprove,
    onReject
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const totalPages = Math.max(1, Math.ceil(lista.length / itemsPerPage));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedList = lista.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);
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

                    {paginatedList.map((solicitud) => (
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
            
            {totalPages > 1 && (
                <PaginationControl 
                    currentPage={safePage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    )
}
