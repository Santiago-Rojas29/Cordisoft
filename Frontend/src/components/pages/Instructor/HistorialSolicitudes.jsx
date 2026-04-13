import { useEffect, useState } from "react"
import axiosClient from "../../../Api/axiosClient"
import { toast } from "sonner"

import CrudLayout from "../../../components/templates/Users/crudLayout"
import SearchBar from "../../../components/molecules/Users/searchBar"

import InstructorHistorialTable from "../../../components/organisms/Requests/instructorHistorialTable"
import SolicitudesDetalleModal from "../../../components/organisms/Requests/solicitudesDetalleModal"

export default function HistorialSolicitudes() {

    const [solicitudes, setSolicitudes] = useState([])
    const [busqueda, setBusqueda] = useState("")

    const [usuarios, setUsuarios] = useState([])
    const [materiales, setMateriales] = useState([])
    const [aprendices, setAprendices] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [solicitudActiva, setSolicitudActiva] = useState(null)
    const [detallesActivos, setDetallesActivos] = useState([])

    const obtenerSolicitudes = async () => {
        try {
            const userStr = localStorage.getItem("user");
            const userData = userStr ? JSON.parse(userStr) : null;
            const finalUserId = userData ? (userData.id || userData.id_usuario) : null;

            if (!finalUserId) {
                toast.error("Error reconociendo la sesión del usuario");
                return;
            }

            const [resSol, resUsu, resMat, resApr] = await Promise.all([
                axiosClient.get("/solicitudes/listar/prestamo"),
                axiosClient.get("/usuarios/listar"),
                axiosClient.get("/materiales/listar"),
                axiosClient.get("/aprendices/listar")
            ]);
            const misSolicitudes = resSol.data.filter(s => s.id_usuario === finalUserId);
            
            setSolicitudes(misSolicitudes)
            setUsuarios(resUsu.data)
            setMateriales(resMat.data)
            setAprendices(resApr.data)
        } catch (error) {
            toast.error("Error cargando el historial de solicitudes")
        }
    }

    useEffect(() => {
        obtenerSolicitudes()
    }, [])

    const solicitudesFiltradas = solicitudes.filter(sol => 
        sol.id_solicitud?.toString().includes(busqueda) || 
        sol.estado?.toLowerCase().includes(busqueda.toLowerCase()) || 
        sol.tipo_solicitud?.toLowerCase().includes(busqueda.toLowerCase())
    );


    const handleReturn = async (solicitud) => {
        if(window.confirm(`¿Estás seguro de DEVOLVER el préstamo asociado a la solicitud #${solicitud.id_solicitud}?`)) {
            try {
                await axiosClient.post("/solicitudes/prestamo/devolver", {
                    id_solicitud: solicitud.id_solicitud
                });
                toast.success("Préstamo devuelto con éxito");
                obtenerSolicitudes();
            } catch (error) {
                console.error(error);
                toast.error("Hubo un error al devolver el préstamo");
            }
        }
    }

    const handleViewDetails = async (solicitud) => {
        setSolicitudActiva(solicitud);
        setDetallesActivos([]);
        setShowModal(true);

        try {
            const res = await axiosClient.get("/detalleSolicitudes/listar");
            const detallesLocal = res.data.filter(d => d.id_solicitud === solicitud.id_solicitud);
            setDetallesActivos(detallesLocal);
        } catch (error) {
            toast.error("Error al cargar los materiales detallados de esta solicitud");
        }
    }

    return (
        <CrudLayout title="Mi Historial de Solicitudes y Préstamos">
            
            <div className="d-flex justify-content-between align-items-center mb-4">
                <SearchBar
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar ID, estado, tipo..."
                />
            </div>

            <InstructorHistorialTable
                lista={solicitudesFiltradas}
                onViewDetails={handleViewDetails}
                onReturn={handleReturn}
            />

            <SolicitudesDetalleModal
                show={showModal}
                onClose={() => setShowModal(false)}
                solicitudActiva={solicitudActiva}
                detalles={detallesActivos}
                usuarios={usuarios}
                materiales={materiales}
                aprendices={aprendices}
            />

        </CrudLayout>
    )
}
