import { useEffect, useState } from "react"
import axiosClient from "../../../Api/axiosClient"
import CrudLayout from "../../../components/templates/Users/crudLayout"
import BodegasTable from "../../../components/organisms/Bodegas/bodegasTable"
import BodegasModal from "../../../components/organisms/Bodegas/bodegasModal"
import SearchBar from "../../../components/molecules/Users/searchBar"
import { toast } from "sonner"

export default function Bodegas() {

  const [lista, setLista] = useState([])
  const [busqueda, setBusqueda] = useState("")

  const [showModal, setShowModal] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [idEditar, setIdEditar] = useState(null)

  const [form, setForm] = useState({
    id_bodega: "",
    nombre: "",
    ubicacion: "",
    estado: "",
    id_area: ""
  })

  const obtenerBodegas = async () => {
    const res = await axiosClient.get("/bodegas/listar")
    setLista(res.data)
  }

  useEffect(() => {
    obtenerBodegas()
  }, [])

  useEffect(() => {
    const delay = setTimeout(async () => {

      if (busqueda.trim() === "") {
        obtenerBodegas()
        return
      }

      const res = await axiosClient.get(`/bodegas/buscar/${busqueda}`)
      setLista(res.data)

    }, 500)

    return () => clearTimeout(delay)
  }, [busqueda])

  const eliminarBodega = async (id) => {

    if (!window.confirm("¿Eliminar bodega?")) return

    await axiosClient.delete(`/bodegas/eliminar/${id}`)
    toast.success("Bodega eliminada")
    obtenerBodegas()

  }


  const handleChange = (e) => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))

  }


  const guardarBodega = async () => {

    try {

      const datos = {
        ...form,
        id_bodega: Number(form.id_bodega),
        id_area: Number(form.id_area)
      }

      if (modoEdicion) {

        await axiosClient.put(`/bodegas/editar/${idEditar}`, datos)
        toast.success("Bodega actualizada")

      } else {

        await axiosClient.post("/bodegas/crear", datos)
        toast.success("Bodega creada")

      }

      obtenerBodegas()
      cerrarModal()

    } catch (error) {

      console.error(error)
      toast.error("Error al guardar usuario")

    }

  }


  const editarBodega = (bodega) => {

    setForm(bodega)
    setModoEdicion(true)
    setIdEditar(bodega.id_bodega)
    setShowModal(true)

  }


  const abrirModal = () => {

    setForm({
      id_bodega: "",
      nombre: "",
      ubicacion: "",
      estado: "",
      id_area: ""
    })

    setModoEdicion(false)
    setIdEditar(null)
    setShowModal(true)

  }


  const cerrarModal = () => {

    setShowModal(false)

  }



  return (

    <CrudLayout
      title="Bodegas"
      abrirModal={abrirModal}
    >

      <SearchBar
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <BodegasTable
        lista={lista}
        onDelete={eliminarBodega}
        onEdit={editarBodega}
      />

      <BodegasModal
        show={showModal}
        onClose={cerrarModal}
        form={form}
        handleChange={handleChange}
        onSave={guardarBodega}
      />

    </CrudLayout>

  )

}