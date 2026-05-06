import { useState } from "react";
import Button from "../../atoms/Users/actionButton"
import PaginationControl from "../../molecules/Shared/PaginationControl"

export default function AreasTable({
    lista,
    onEdit,
    onDelete
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const totalPages = Math.max(1, Math.ceil(lista.length / itemsPerPage));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedList = lista.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);

    return (

        <div className="table-responsive shadow-sm rounded-4 bg-white p-2">
            <table className="table table-hover align-middle mb-0 text-center">

                <thead className="table-light text-secondary">

                    <tr>

                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Usuario</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody className="border-top-0">

                {paginatedList.map(area => (

                    <tr key={area.id_area}>

                        <td>{area.id_area}</td>
                        <td>{area.nombre}</td>
                        <td>{area.estado}</td>
                        <td>{area.usuario_nombre}</td>

                        <td>

                            <Button
                                label="Editar"
                                color="warning"
                                onClick={() => onEdit(area)}
                            />

                            <Button
                                label="Eliminar"
                                color="danger"
                                onClick={() => onDelete(area.id_area)}
                            />

                        </td>

                    </tr>

                ))}

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