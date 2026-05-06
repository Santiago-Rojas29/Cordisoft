import ActionButton from "../../atoms/Users/actionButton"
import BadgeStatus from "../../atoms/Shared/badgeStatus"

export default function SolicitudesRow({
    solicitud,
    usuarios = [],
    onViewDetails,
    onApprove,
    onReject
}) {
    const isPending = solicitud.estado === "Pendiente";
    const tipo = String(solicitud.tipo_solicitud).toLowerCase();
    const isLoan = tipo === "prestamo" || tipo === "préstamo";
    const estadoText = solicitud.estado_prestamo ? solicitud.estado_prestamo.charAt(0).toUpperCase() + solicitud.estado_prestamo.slice(1) : "Pendiente";

    const instructorInfo = usuarios.find(u => u.id_usuario === solicitud.id_usuario);
    const nombreVisual = instructorInfo ? `${instructorInfo.nombre} ${instructorInfo.apellidos}` : solicitud.id_usuario;

    return (
        <tr>
            <td className="fw-bold text-muted">#{solicitud.id_solicitud}</td>
            <td>{nombreVisual}</td>
            <td>{solicitud.tipo_solicitud}</td>
            <td>{solicitud.fecha_creacion?.split("T")[0]}</td>
            <td className="text-muted">{solicitud.fecha_entrega ? solicitud.fecha_entrega.split("T")[0] : "No definida"}</td>
            <td>
                <BadgeStatus status={solicitud.estado} />
            </td>
            <td>
                {isLoan ? (
                    <span className={`badge ${solicitud.estado_prestamo === 'activo' ? "bg-warning" : solicitud.estado_prestamo === 'devuelto' ? "bg-info" : "bg-secondary"}`}>
                        {solicitud.estado_prestamo || "Pendiente"}
                    </span>
                ) : (
                    <span className="text-muted">N/A</span>
                )}
            </td>
            <td>
                <div className="d-flex justify-content-center gap-2">
                    <ActionButton
                        label="Detalles"
                        color="primary"
                        onClick={() => onViewDetails(solicitud)}
                    />

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
