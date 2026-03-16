import { useEffect, useState } from "react"
import axiosClient from "../../../Api/axiosClient"

import CrudLayout from "../../../components/templates/Users/crudLayout"
import AreasTable from "../../../components/organisms/Areas/areasTable"
import AreaModal from "../../../components/organisms/Areas/areasModal"
import SearchBar from "../../../components/molecules/Users/searchBar"

import { toast } from "sonner"

export default function Areas(){

  const [lista,setLista] = useState([])
  const [usuarios,setUsuarios] = useState([])
  const [busqueda,setBusqueda] = useState("")

  const [showModal,setShowModal] = useState(false)
  const [modoEdicion,setModoEdicion] = useState(false)
  const [idEditar,setIdEditar] = useState(null)

  const [form,setForm] = useState({
    nombre:"",
    estado:"",
    id_usuario:"",
    descripcion:""
  })


  const obtenerAreas = async () => {

    try{

      const res = await axiosClient.get("/areas/listar")
      setLista(res.data)

    }catch{

      toast.error("No se pudieron cargar las áreas")

    }

  }


  const obtenerUsuarios = async () => {

    try{

      const res = await axiosClient.get("/usuarios/listar")
      setUsuarios(res.data)

    }catch{

      toast.error("No se pudieron cargar los usuarios")

    }

  }


  useEffect(()=>{

    obtenerAreas()
    obtenerUsuarios()

  },[])



  useEffect(()=>{

    const delay = setTimeout(async()=>{

      if(busqueda.trim() === ""){
        obtenerAreas()
        return
      }

      try{

        const res = await axiosClient.get(`/areas/buscar/${busqueda}`)
        setLista(res.data)

      }catch{

        toast.error("Error buscando áreas")

      }

    },500)

    return ()=>clearTimeout(delay)

  },[busqueda])



  const eliminarArea = async (id) => {

    if(!window.confirm("¿Eliminar área?")) return

    try{

      await axiosClient.delete(`/areas/eliminar/${id}`)

      toast.success("Área eliminada")

      obtenerAreas()

    }catch{

      toast.error("Error eliminando área")

    }

  }



  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }



  const guardarArea = async () => {

    const datosProcesados = {
      ...form,
      id_usuario: form.id_usuario ? Number(form.id_usuario) : null
    }

    try{

      if(modoEdicion){

        await axiosClient.put(
          `/areas/editar/${idEditar}`,
          datosProcesados
        )

        toast.success("Área actualizada")

      }else{

        await axiosClient.post(
          "/areas/crear",
          datosProcesados
        )

        toast.success("Área creada")

      }

      cerrarModal()
      obtenerAreas()

    }catch{

      toast.error("Error guardando área")

    }

  }



  const editarArea = (area) => {

    setForm({
      nombre: area.nombre || "",
      estado: area.estado || "",
      id_usuario: area.id_usuario ? String(area.id_usuario) : "",
      descripcion: area.descripcion || ""
    })

    setModoEdicion(true)
    setIdEditar(area.id_area)
    setShowModal(true)

  }



  const abrirModal = () => {

    setForm({
      nombre:"",
      estado:"",
      id_usuario:"",
      descripcion:""
    })

    setModoEdicion(false)
    setIdEditar(null)
    setShowModal(true)

  }



  const cerrarModal = () => {

    setShowModal(false)

    setForm({
      nombre:"",
      estado:"",
      id_usuario:"",
      descripcion:""
    })

    setModoEdicion(false)
    setIdEditar(null)

  }



  return(

    <CrudLayout
      title="Áreas"
      abrirModal={abrirModal}
    >

      <SearchBar
        value={busqueda}
        onChange={(e)=>setBusqueda(e.target.value)}
      />

      <AreasTable
        lista={lista}
        onEdit={editarArea}
        onDelete={eliminarArea}
      />

      <AreaModal
        show={showModal}
        onClose={cerrarModal}
        onSave={guardarArea}
        form={form}
        onChange={handleChange}
        modoEdicion={modoEdicion}
        usuarios={usuarios}
      />

    </CrudLayout>

  )

}