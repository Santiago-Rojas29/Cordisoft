  import { useEffect, useState } from "react"
  import axiosClient from "../../../Api/axiosClient"

  import CrudLayout from "../../../components/templates/Users/crudLayout"
  import FichasTable from "../../../components/organisms/Fichas/fichasTable"
  import FichasModal from "../../../components/organisms/Fichas/fichasModal"
  import SearchBar from "../../../components/molecules/Users/searchBar"

  import { toast } from "sonner"

  export default function Fichas(){

  const [lista,setLista] = useState([])
  const [areas,setAreas] = useState([])
  const [usuarios,setUsuarios] = useState([])
  const [busqueda,setBusqueda] = useState("")

  const [showModal,setShowModal] = useState(false)
  const [modoEdicion,setModoEdicion] = useState(false)
  const [idEditar,setIdEditar] = useState(null)

  const [form,setForm] = useState({
  nombre:"",
  estado:"",
  id_area:"",
  id_usuario:"",
  codigo:""
  })


  const obtenerFichas = async()=>{

  try{

  const res = await axiosClient.get("/fichas/listar")
  setLista(res.data)

  }catch{

  toast.error("No se pudieron cargar las fichas")

  }

  }



  const obtenerAreas = async()=>{

  try{

  const res = await axiosClient.get("/areas/listar")
  setAreas(res.data)

  }catch{

  toast.error("Error cargando áreas")

  }

  }



  const obtenerUsuarios = async()=>{

  try{

  const res = await axiosClient.get("/usuarios/listar")
  setUsuarios(res.data)

  }catch{

  toast.error("Error cargando usuarios")

  }

  }



  useEffect(()=>{

  obtenerFichas()
  obtenerAreas()
  obtenerUsuarios()

  },[])


  useEffect(()=>{

  const delay = setTimeout(()=>{

  if(busqueda.trim()===""){
  obtenerFichas()
  return
  }

  const filtradas = lista.filter(ficha =>
  ficha.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  String(ficha.codigo).includes(busqueda)
  )

  setLista(filtradas)

  },400)

  return ()=>clearTimeout(delay)

  },[busqueda])


  const handleChange = (e)=>{

  setForm({
  ...form,
  [e.target.name]:e.target.value
  })

  }



  const guardarFicha = async()=>{

  const datos={
  ...form,
  id_area:Number(form.id_area),
  id_usuario:Number(form.id_usuario),
  codigo:Number(form.codigo)
  }

  try{

  if(modoEdicion){

  await axiosClient.put(`/fichas/editar/${idEditar}`,datos)

  toast.success("Ficha actualizada")

  }else{

  await axiosClient.post("/fichas/crear",datos)

  toast.success("Ficha creada")

  }

  obtenerFichas()
  cerrarModal()

  }catch{

  toast.error("Error guardando ficha")

  }

  }



  const eliminarFicha = async(id)=>{

  if(!window.confirm("¿Eliminar ficha?")) return

  await axiosClient.delete(`/fichas/eliminar/${id}`)

  toast.success("Ficha eliminada")

  obtenerFichas()

  }



  const editarFicha=(ficha)=>{

  setForm({
  nombre:ficha.nombre,
  estado:ficha.estado,
  id_area:String(ficha.id_area),
  id_usuario:String(ficha.id_usuario),
  codigo:ficha.codigo
  })

  setModoEdicion(true)
  setIdEditar(ficha.id_ficha)
  setShowModal(true)

  }


  const abrirModal=()=>{

  setForm({
  nombre:"",
  estado:"",
  id_area:"",
  id_usuario:"",
  codigo:""
  })

  setModoEdicion(false)
  setIdEditar(null)
  setShowModal(true)

  }

  const cerrarModal=()=>{

  setShowModal(false)

  }



  return(

  <CrudLayout
  title="Fichas"
  abrirModal={abrirModal}
  >

  <SearchBar
  value={busqueda}
  onChange={(e)=>setBusqueda(e.target.value)}
  />

  <FichasTable
  lista={lista}
  onEdit={editarFicha}
  onDelete={eliminarFicha}
  />

  <FichasModal
  show={showModal}
  onClose={cerrarModal}
  form={form}
  areas={areas}
  usuarios={usuarios}
  onChange={handleChange}
  onSave={guardarFicha}
  modoEdicion={modoEdicion}
  />

  </CrudLayout>

  )

  }