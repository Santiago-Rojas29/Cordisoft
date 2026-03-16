import { useEffect, useState } from "react"
import axiosClient from "../../../Api/axiosClient"
import CrudLayout from "../../../components/templates/Users/crudLayout"
import UsersTable from "../../../components/organisms/Users/usersTable"
import UserModal from "../../../components/organisms/Users/usersModal"
import SearchBar from "../../../components/molecules/Users/searchBar"
import { toast } from "sonner"

export default function Usuarios() {

  const [lista, setLista] = useState([])
  const [busqueda, setBusqueda] = useState("")

  const [showModal, setShowModal] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [idEditar, setIdEditar] = useState(null)

  const [form, setForm] = useState({
    id_usuario: "",
    correo_electronico: "",
    identificacion: "",
    nombre: "",
    apellidos: "",
    estado: "Activo",
    id_rol: "",
    contraseña: ""
  })

  const obtenerUsuarios = async () => {
    const res = await axiosClient.get("/usuarios/listar")
    setLista(res.data)
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  useEffect(() => {
    const delay = setTimeout(async () => {

      if (busqueda.trim() === "") {
        obtenerUsuarios()
        return
      }

      const res = await axiosClient.get(`/usuarios/buscar/${busqueda}`)
      setLista(res.data)

    }, 500)

    return () => clearTimeout(delay)
  }, [busqueda])

  const eliminarUsuario = async (id) => {

    if (!window.confirm("¿Eliminar usuario?")) return

    await axiosClient.delete(`/usuarios/eliminar/${id}`)
    toast.success("Usuario eliminado")
    obtenerUsuarios()

  }


  const handleChange = (e) => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))

  }


  const guardarUsuario = async () => {

    try {

      const datos = {
        ...form,
        id_usuario: Number(form.id_usuario),
        identificacion: Number(form.identificacion),
        id_rol: Number(form.id_rol)
      }

      if (modoEdicion) {

        await axiosClient.put(`/usuarios/editar/${idEditar}`, datos)
        toast.success("Usuario actualizado")

      } else {

        await axiosClient.post("/usuarios/crear", datos)
        toast.success("Usuario creado")

      }

      obtenerUsuarios()
      cerrarModal()

    } catch (error) {

      console.error(error)
      toast.error("Error al guardar usuario")

    }

  }


  const editarUsuario = (usuario) => {

    setForm(usuario)
    setModoEdicion(true)
    setIdEditar(usuario.id_usuario)
    setShowModal(true)

  }


  const abrirModal = () => {

    setForm({
      id_usuario: "",
      correo_electronico: "",
      identificacion: "",
      nombre: "",
      apellidos: "",
      estado: "Activo",
      id_rol: "",
      contraseña: ""
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
      title="Usuarios"
      abrirModal={abrirModal}
    >

      <SearchBar
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <UsersTable
        lista={lista}
        onDelete={eliminarUsuario}
        onEdit={editarUsuario}
      />

      <UserModal
        show={showModal}
        onClose={cerrarModal}
        form={form}
        handleChange={handleChange}
        onSave={guardarUsuario}
      />

    </CrudLayout>

  )

}