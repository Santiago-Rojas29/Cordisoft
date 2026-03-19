import { useEffect, useState } from "react"
import axiosClient from "../../../Api/axiosClient"
import { toast } from "sonner"

import CrudLayout from "../../../components/templates/Users/crudLayout"
import SearchBar from "../../../components/molecules/Users/searchBar"

import SolicitudesTable from "../../../components/organisms/Requests/solicitudesTable"
import SolicitudesDetalleModal from "../../../components/organisms/Requests/solicitudesDetalleModal"

export default function Solicitudes() {

    const [solicitudes, setSolicitudes] = useState([])
    const [busqueda, setBusqueda] = useState("")

    // Estados para el Modal de Detalles
    const [showModal, setShowModal] = useState(false)
    const [solicitudActiva, setSolicitudActiva] = useState(null)
    const [detallesActivos, setDetallesActivos] = useState([])

    const obtenerSolicitudes = async () => {
        try {
            const res = await axiosClient.get("/solicitudes/listar")
            setSolicitudes(res.data)
        } catch (error) {
            toast.error("Error cargando las solicitudes")
        }
    }

    useEffect(() => {
        obtenerSolicitudes()
    }, [])

    // Simulación de búsqueda local rápida (Opcional, si no hay backend endpoint para buscar)
    const solicitudesFiltradas = solicitudes.filter(sol => 
        sol.id_solicitud?.toString().includes(busqueda) || 
        sol.id_usuario?.toString().includes(busqueda) || 
        sol.estado?.toLowerCase().includes(busqueda.toLowerCase()) || 
        sol.tipo_solicitud?.toLowerCase().includes(busqueda.toLowerCase())
    );

    // FUNCIONES DEL ADMINISTRADOR

    const cambiarEstadoSolicitud = async (solicitud, nuevoEstado) => {
        try {
            // Helpers para purgar el stamp ISO que MySQL rechaza
            const formatoFecha = (fecha) => fecha ? fecha.split('T')[0] : null;

            // El backend exige enviar todos los campos en el PUT de Editar.
            await axiosClient.put(`/solicitudes/editar/${solicitud.id_solicitud}`, {
                id_usuario: solicitud.id_usuario,
                tipo_solicitud: solicitud.tipo_solicitud,
                fecha_creacion: formatoFecha(solicitud.fecha_creacion),
                fecha_entrega: formatoFecha(solicitud.fecha_entrega),
                estado: nuevoEstado
            });

            toast.success(`Solicitud #${solicitud.id_solicitud} ha sido ${nuevoEstado}`);
            obtenerSolicitudes(); // Recargar datos

        } catch (error) {
            console.error("Error modificando petición:", error);
            toast.error("Error actualizando la solicitud");
        }
    }

    const handleApprove = (solicitud) => {
        if(window.confirm(`¿Estás seguro de APROBAR la solicitud #${solicitud.id_solicitud}?`)) {
            cambiarEstadoSolicitud(solicitud, "Aprobada");
        }
    }

    const handleReject = (solicitud) => {
        if(window.confirm(`¿Estás seguro de RECHAZAR la solicitud #${solicitud.id_solicitud}?`)) {
            cambiarEstadoSolicitud(solicitud, "Rechazada");
        }
    }

    const handleViewDetails = async (solicitud) => {
        setSolicitudActiva(solicitud);
        setDetallesActivos([]); // Limpiar carga previa
        setShowModal(true);

        try {
            // Cargar todos los detalles para esta sola solicitud
            const res = await axiosClient.get("/detalleSolicitudes/listar");
            const detallesLocal = res.data.filter(d => d.id_solicitud === solicitud.id_solicitud);
            setDetallesActivos(detallesLocal);
        } catch (error) {
            toast.error("Error al cargar los materiales detallados de esta solicitud");
        }
    }

    return (
        <CrudLayout title="Gestión de Solicitudes">
            
            <div className="d-flex justify-content-between align-items-center mb-4">
                <SearchBar
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar ID, estado, usuario..."
                />
            </div>

            <SolicitudesTable
                lista={solicitudesFiltradas}
                onViewDetails={handleViewDetails}
                onApprove={handleApprove}
                onReject={handleReject}
            />

            <SolicitudesDetalleModal
                show={showModal}
                onClose={() => setShowModal(false)}
                solicitudActiva={solicitudActiva}
                detalles={detallesActivos}
            />

        </CrudLayout>
    )
}
