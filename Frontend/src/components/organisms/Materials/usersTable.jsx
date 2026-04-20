import { useState } from "react";
import UserRow from "../../molecules/Materials/materialsRow"
import PaginationControl from "../../molecules/Shared/PaginationControl"

export default function UsersTable({
    lista,
    areas = [],
    bodegas = [],
    fichas = [],
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
            <table className="table table-hover align-middle mb-0">

                <thead className="table-light text-secondary">

                    <tr>

                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Codigo</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                        <th>Descripcion</th>
                        <th>Área</th>
                        <th>Cantidad</th>
                        <th>Bodega</th>
                        <th>Ficha</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody className="border-top-0">

                    {paginatedList.map((material) => (
                        <UserRow
                            key={material.id_material}
                            material={material}
                            areas={areas}
                            bodegas={bodegas}
                            fichas={fichas}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
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