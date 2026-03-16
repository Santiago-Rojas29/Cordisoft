import ActionButton from "../../atoms/Users/actionButton"

export default function SolicitudesRow({
    solicitud,
    onViewDetails,
    onApprove,
    onReject
}) {
    // Definimos colores según el estado
    const badgeColor = 
        solicitud.estado === "Aprobada" ? "success" : 
        solicitud.estado === "Rechazada" ? "danger" : 
        "warning text-dark";

    const isPending = solicitud.estado === "Pendiente";

    return (
        <tr>
            <td className="fw-bold text-muted">#{solicitud.id_solicitud}</td>
            <td>{solicitud.id_usuario}</td>
            <td>{solicitud.tipo_solicitud}</td>
            <td>{solicitud.fecha_creacion?.split("T")[0]}</td>
            <td className="text-muted">{solicitud.fecha_entrega ? solicitud.fecha_entrega.split("T")[0] : "No definida"}</td>
            <td>
                <span className={`badge bg-${badgeColor} rounded-pill px-3 py-2`}>
                    {solicitud.estado}
                </span>
            </td>
            <td>
                <div className="d-flex justify-content-center gap-2">
                    <ActionButton 
                        label="Detalles" 
                        color="primary" 
                        onClick={() => onViewDetails(solicitud)} 
                    />
                    
                    {/* Botones de acción sólo si está Pendiente */}
                    {isPending && (
                        <>
                            <ActionButton 
                                label="Aceptar" 
                                color="success" 
                                onClick={() => onApprove(solicitud)} 
                            />
                            <ActionButton 
                                label="Rechazar" 
                                color="danger" 
                                onClick={() => onReject(solicitud)} 
                            />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}
