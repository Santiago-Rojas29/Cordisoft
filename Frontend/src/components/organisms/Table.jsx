import React from 'react';

/**
 * Tabla Genérica reutilizable (Organismo)
 * 
 * @param {Array} columns - Arreglo de objetos: { label: String, accessor: String, render: Function (opcional), center: Boolean }
 * @param {Array} data - Arreglo de datos a mostrar
 * @param {String} keyField - El nombre de la propiedad única (ej: 'id_usuario')
 * @param {String} emptyMessage - Mensaje a mostrar cuando no hay datos
 */
const Table = ({ columns, data, keyField = "id", emptyMessage = "No hay registros" }) => {
    return (
        <div className="table-responsive shadow-sm rounded-4 bg-white p-2">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-secondary">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className={`fw-semibold py-3 ${col.center ? 'text-center' : ''} ${idx === 0 ? 'px-3' : ''}`}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="border-top-0">
                    {!data || data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-5 text-muted">
                                <span className="d-block mb-2 fs-4">📁</span>
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr key={row[keyField]}>
                                {columns.map((col, idx) => (
                                    <td
                                        key={col.accessor}
                                        className={`${col.center ? 'text-center' : ''} ${idx === 0 ? 'px-3 fw-bold text-secondary' : ''}`}
                                    >
                                        {col.render ? col.render(row) : row[col.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
