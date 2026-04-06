import { useEffect, useState } from "react"
import axiosClient from "../../../Api/axiosClient"
import { toast } from "sonner"

import CrudLayout from "../../../components/templates/Users/crudLayout"
import SearchBar from "../../../components/molecules/Users/searchBar"

import RequestButton from "../../../components/atoms/Requests/requestButton"
import RequestsMaterialTable from "../../../components/organisms/Requests/requestsMaterialTable"
import RequestFormModal from "../../../components/organisms/Requests/requestFormModal"

export default function Solicitar() {

  const [listaMateriales, setListaMateriales] = useState([])
  const [listaAprendices, setListaAprendices] = useState([])
  const [listaFichas, setListaFichas] = useState([])
  const [busqueda, setBusqueda] = useState("")

  const [materialesSeleccionados, setMaterialesSeleccionados] = useState([])

  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
      id_ficha: "",
      id_aprendiz: ""
  });

  const obtenerDatos = async () => {
    try {
        const [resMat, resApr, resFichas] = await Promise.all([
            axiosClient.get("/materiales/listar"),
            axiosClient.get("/aprendiz/listar").catch(() => axiosClient.get("/aprendices/listar")), 
            axiosClient.get("/ficha/listar").catch(() => axiosClient.get("/fichas/listar"))
        ]);
        setListaMateriales(resMat.data)
        setListaAprendices(resApr.data)
        setListaFichas(resFichas.data)
    } catch (error) {
        toast.error("Error cargando algunos datos del servidor");
    }
  }

  useEffect(() => {
    obtenerDatos()
  }, [])

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (busqueda.trim() === "") {
        axiosClient.get("/materiales/listar").then(res => setListaMateriales(res.data));
        return
      }
      try {
        const res = await axiosClient.get(`/materiales/buscar/${busqueda}`)
        setListaMateriales(res.data)
      } catch (error) {
      }
    }, 500)

    return () => clearTimeout(delay)
  }, [busqueda])

  const handleToggleMaterial = (material) => {
      setMaterialesSeleccionados(prev => {
          const yaExiste = prev.some(item => item.id_material === material.id_material);
          if (yaExiste) {
              return prev.filter(item => item.id_material !== material.id_material);
          } else {
              return [...prev, { 
                  ...material, 
                  cantidad_solicitada: 1,
                  cantidad_stock: material.cantidad 
              }];
          }
      });
  }

  const handleCantidadChange = (idMaterial, nuevaCantidad) => {
      setMaterialesSeleccionados(prev => prev.map(item => {
          if(item.id_material === idMaterial) {
              return { ...item, cantidad_solicitada: nuevaCantidad }
          }
          return item;
      }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
        ...prev,
        [name]: value
    }));
  }

  const guardarSolicitud = async (e) => {
    if (e) e.preventDefault();

    if (materialesSeleccionados.length === 0) {
        toast.error("Agrega al menos un material a la solicitud.");
        return;
    }
    if (!form.id_aprendiz) { 
        toast.error("Por favor selecciona un aprendiz.");
        return;
    }

    try {
        const userStr = localStorage.getItem("user");
        const userData = userStr ? JSON.parse(userStr) : null;
        
        const finalUserId = userData ? (userData.id || userData.id_usuario) : null;

        if (!finalUserId) {
            toast.error("Error: No se encontró el usuario activo en sesión.");
            return;
        }

        const resSolicitud = await axiosClient.post("/solicitudes/crear", {
            id_usuario: finalUserId,
            tipo_solicitud: "Prestamo",
            fecha_creacion: new Date().toISOString().split('T')[0],
            fecha_entrega: null,
            estado: "Pendiente"
        });

        const id_solicitud = resSolicitud.data?.insertId || resSolicitud.data?.id_solicitud || resSolicitud.data || 1; 

        const promesasDetalles = materialesSeleccionados.map(material => {
            return axiosClient.post("/detalleSolicitudes/crear", {
                id_solicitud: id_solicitud,
                id_material: Number(material.id_material),
                cantidad: Number(material.cantidad_solicitada),
                id_aprendiz: Number(form.id_aprendiz)
            });
        });

        await Promise.all(promesasDetalles);

        toast.success("Solicitud creada con éxito");
        setMaterialesSeleccionados([]); 
        cerrarModal();

    } catch (error) {
        console.error(error);
        toast.error("Error al crear la solicitud");
    }
  }

  const abrirModal = () => {
    setShowModal(true)
  }

  const cerrarModal = () => {
    setShowModal(false)
  }

  return (
    <CrudLayout
      title="Materiales"
      headerAction={
          <RequestButton 
             onClick={abrirModal} 
             label={`Detalle de solicitud ${materialesSeleccionados.length > 0 ? `(${materialesSeleccionados.length})` : ""}`} 
          />
      }
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
          <SearchBar
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
      </div>

      <RequestsMaterialTable
        lista={listaMateriales}
        onToggle={handleToggleMaterial}
        selectedItems={materialesSeleccionados}
      />

      <RequestFormModal
        show={showModal}
        onClose={cerrarModal}
        materialesSeleccionados={materialesSeleccionados}
        fichas={listaFichas}
        aprendices={listaAprendices}
        onSave={guardarSolicitud}
        form={form}
        onChange={handleChange}
        onCantidadChange={handleCantidadChange}
      />

    </CrudLayout>
  )
}