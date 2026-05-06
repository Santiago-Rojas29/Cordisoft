import { useState } from "react";
import UserRow from "../../molecules/Users/userRow"
import PaginationControl from "../../molecules/Shared/PaginationControl"

export default function UsersTable({
    lista,
    roles = [],
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

                    {paginatedList.map((usuario) => (
                        <UserRow
                            key={usuario.id_usuario}
                            usuario={usuario}
                            roles={roles}
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