export default function SolicitudesDetalleModal({
    show,
    onClose,
    detalles = [],
    solicitudActiva
}) {
    if (!show) return null;

    return (
        <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content shadow-lg border-0" style={{ borderRadius: "12px" }}>
                    
                    <div className="modal-header border-bottom-0 p-4 pb-0">
                        <h4 className="modal-title fw-bold">
                            Detalles de la Solicitud #{solicitudActiva?.id_solicitud}
                        </h4>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body p-4 pt-3">
                        <div className="mb-3 d-flex justify-content-between align-items-center bg-light p-3 rounded">
                            <div><strong>Usuario:</strong> {solicitudActiva?.id_usuario}</div>
                            <div><strong>Fecha:</strong> {solicitudActiva?.fecha_creacion?.split("T")[0]}</div>
                            <div>
                                <strong>Estado: </strong> 
                                <span className={`badge bg-${solicitudActiva?.estado === 'Pendiente' ? 'warning text-dark' : solicitudActiva?.estado === 'Aprobada' ? 'success' : 'danger'}`}>
                                    {solicitudActiva?.estado}
                                </span>
                            </div>
                        </div>

                        <h5 className="fw-bold mb-3">Materiales Solicitados</h5>

                        {detalles.length === 0 ? (
                            <div className="alert alert-info py-2">Cargando detalles o sin materiales...</div>
                        ) : (
                            <div className="table-responsive border rounded">
                                <table className="table table-sm table-striped align-middle text-center mb-0">
                                    <thead className="table-light text-secondary">
                                        <tr>
                                            <th>ID Detalle</th>
                                            <th>ID Material</th>
                                            <th>ID Aprendiz</th>
                                            <th>Cantidad Autorizada</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detalles.map((detalle) => (
                                            <tr key={detalle.id_detalle}>
                                                <td className="fw-bold">#{detalle.id_detalle}</td>
                                                <td>Data Material: {detalle.id_material}</td>
                                                <td>{detalle.id_aprendiz || "N/A"}</td>
                                                <td className="fw-bold">{detalle.cantidad}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    
                    <div className="modal-footer border-top-0 pb-4 justify-content-center">
                        <button 
                            type="button" 
                            className="btn btn-secondary px-4 fw-bold shadow-sm" 
                            style={{ borderRadius: "8px" }}
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
