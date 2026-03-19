import React from 'react';

export default function RequestsMaterialTable({
    lista,
    onToggle,
    selectedItems = []
}) {
    // Comprueba si un material ya está seleccionado comparando IDs
    const isSelected = (id) => selectedItems.some(item => item.id_material === id);

    return(
        <div className="table-responsive shadow-sm rounded-4 bg-white p-2">
            <table className="table table-hover align-middle mb-0 text-center">
                <thead className="table-light text-secondary">
                    <tr>
                        <th>Código</th>
                        <th>Elemento</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Ficha</th>
                        <th>Bodega</th>
                        <th>Área</th>
                        <th>Seleccionar</th>
                    </tr>
                </thead>

                <tbody className="border-top-0">
                    {lista.map((material) => {
                        const added = isSelected(material.id_material);
                        return (
                            <tr key={material.id_material} className={added ? "table-success" : ""}>
                                <td className="fw-bold text-muted">{material.codigo || "N/A"}</td>
                                <td className="fw-bold">{material.nombre}</td>
                                <td>{material.tipo}</td>
                                <td>{material.cantidad}</td>
                                <td className="text-muted">{material.id_ficha || "No aplica"}</td>
                                <td className="text-muted">{material.id_bodega || "Bodega General"}</td>
                                <td className="text-muted">{material.id_area || "General"}</td>
                                <td>
                                    <button 
                                        className={`btn btn-sm border-0 rounded-circle ${added ? "btn-outline-danger" : "btn-outline-success"}`}
                                        onClick={() => onToggle(material)}
                                        title={added ? "Quitar de la solicitud" : "Agregar a la solicitud"}
                                    >
                                        {added ? "✖" : "✔"}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    
                    {lista.length === 0 && (
                        <tr>
                            <td colSpan="8" className="text-center py-4 text-muted">No se encontraron materiales</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
