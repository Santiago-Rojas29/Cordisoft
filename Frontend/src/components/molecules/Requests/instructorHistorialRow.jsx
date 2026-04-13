import ActionButton from "../../atoms/Users/actionButton"
import BadgeStatus from "../../atoms/Shared/badgeStatus"

export default function InstructorHistorialRow({
    solicitud,
    onViewDetails,
    onReturn
}) {
    const tipo = String(solicitud.tipo_solicitud).toLowerCase();
    const isLoan = tipo === "prestamo" || tipo === "préstamo";
    const estadoPrestamo = solicitud.estado_prestamo || "activo"; // Fallback para préstamos antiguos sin registro en tabla
    const canReturn = isLoan && estadoPrestamo === "activo";
    const isReturned = isLoan && estadoPrestamo === "devuelto";

    return (
        <tr>
            <td className="fw-bold text-muted">#{solicitud.id_solicitud}</td>
            <td className="text-capitalize">{solicitud.tipo_solicitud}</td>
            <td>{solicitud.fecha_creacion?.split("T")[0]}</td>
            <td>
                <BadgeStatus status={solicitud.estado} />
            </td>
            <td>
                {isLoan ? (
                    <span className={`badge ${canReturn ? "bg-warning" : "bg-info"}`}>
                        {estadoPrestamo}
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
                    
                    {canReturn && (
                        <ActionButton 
                            label="Devolver" 
                            color="warning" 
                            onClick={() => onReturn(solicitud)} 
                        />
                    )}
                </div>
            </td>
        </tr>
    );
}
