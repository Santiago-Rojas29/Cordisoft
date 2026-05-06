import { useState } from "react";
import Button from "../../atoms/Users/actionButton"
import PaginationControl from "../../molecules/Shared/PaginationControl"

export default function FichasTable({ lista, onEdit, onDelete }) {
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
                        <th>Área</th>
                        <th>Usuario</th>
                        <th>Código</th>
                        <th>Acciones</th>
                    </tr>

                </thead>

                <tbody className="border-top-0">

                {paginatedList.map(ficha => (

                    <tr key={ficha.id_ficha}>

                        <td>{ficha.id_ficha}</td>
                        <td>{ficha.nombre}</td>
                        <td>{ficha.estado}</td>
                        <td>{ficha.area}</td>
                        <td>{ficha.usuario}</td>
                        <td>{ficha.codigo}</td>

                        <td>

                            <Button
                                label="Editar"
                                color="warning"
                                onClick={() => onEdit(ficha)}
                            />

                            <Button
                                label="Eliminar"
                                color="danger"
                                onClick={() => onDelete(ficha.id_ficha)}
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