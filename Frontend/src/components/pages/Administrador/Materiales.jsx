import { useEffect, useState } from "react"
import axiosClient from "../../../Api/axiosClient"
import CrudLayout from "../../../components/templates/Users/crudLayout"
import UsersTable from "../../../components/organisms/Materials/usersTable"
import UserModal from "../../../components/organisms/Materials/usersModal"
import SearchBar from "../../../components/molecules/Users/searchBar"
import { toast } from "sonner"

export default function Materiales() {

  const [lista, setLista] = useState([])
  const [busqueda, setBusqueda] = useState("")

  const [showModal, setShowModal] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [idEditar, setIdEditar] = useState(null)

  const [form, setForm] = useState({
    id_material: "",
    nombre: "",
    codigo: "",
    tipo: "consumible",
    estado: "",
    descripcion: "",
    id_area: "",
    cantidad: "",
    id_bodega: "",
    id_ficha: ""
  })

  const obtenerMaterial = async () => {
    const res = await axiosClient.get("/materiales/listar")
    setLista(res.data)
  }

  useEffect(() => {
    obtenerMaterial()
  }, [])

  useEffect(() => {
    const delay = setTimeout(async () => {

      if (busqueda.trim() === "") {
        obtenerMaterial()
        return
      }

      const res = await axiosClient.get(`/materiales/buscar/${busqueda}`)
      setLista(res.data)

    }, 500)

    return () => clearTimeout(delay)
  }, [busqueda])

  const eliminarMaterial = async (id) => {

    if (!window.confirm("¿Eliminar material?")) return

    await axiosClient.delete(`/materiales/eliminar/${id}`)
    toast.success("Material eliminado")
    obtenerMaterial()

  }


  const handleChange = (e) => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))

  }


  const guardarMaterial = async () => {

    try {

      const datos = {
        ...form,
        id_material: Number(form.id_material),
        codigo: Number(form.codigo),
        id_area: Number(form.id_area),
        cantidad: Number(form.cantidad),
        id_bodega: Number(form.id_bodega),
        id_ficha: Number(form.id_ficha)
      }

      if (modoEdicion) {

        await axiosClient.put(`/materiales/editar/${idEditar}`, datos)
        toast.success("Material actualizado")

      } else {

        await axiosClient.post("/materiales/crear", datos)
        toast.success("Material creado")

      }

      obtenerMaterial()
      cerrarModal()

    } catch (error) {

      console.error(error)
      toast.error("Error al guardar material")

    }

  }


  const editarMaterial = (material) => {

    setForm(material)
    setModoEdicion(true)
    setIdEditar(material.id_material)
    setShowModal(true)

  }


  const abrirModal = () => {

    setForm({
      id_material: "",
      nombre: "",
      codigo: "",
      tipo: "consumible",
      estado: "",
      descripcion: "",
      id_area: "",
      cantidad: "",
      id_bodega: "",
      id_ficha: ""
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
      title="Materiales"
      abrirModal={abrirModal}
    >

      <SearchBar
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <UsersTable
        lista={lista}
        onDelete={eliminarMaterial}
        onEdit={editarMaterial}
      />

      <UserModal
        show={showModal}
        onClose={cerrarModal}
        form={form}
        handleChange={handleChange}
        onSave={guardarMaterial}
      />

    </CrudLayout>

  )

}