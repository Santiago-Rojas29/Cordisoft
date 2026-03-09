import { useEffect,useState } from "react"
import axiosClient from "../../../Api/axiosClient"

import CrudLayout from "../../../components/templates/Users/crudLayout"
import UsersTable from "../../../components/organisms/Users/usersTable"
import UserModal from "../../../components/organisms/Users/usersModal"

export default function Usuarios(){

  const[lista,setLista]=useState([])
  const[showModal,setShowModal]=useState(false)

  const[form,setForm]=useState({
    correo_electronico:"",
    identificacion:"",
    nombre:"",
    apellidos:"",
    estado:"activa"
  })

  const obtenerUsuarios=async()=>{

    const res=await axiosClient.get("/usuarios/listar")

    setLista(res.data)

  }

  useEffect(()=>{

    obtenerUsuarios()

  },[])

  const eliminarUsuario=async(id)=>{

    if(!window.confirm("Eliminar usuario?"))return

    await axiosClient.delete(`/usuarios/eliminar/${id}`)

    obtenerUsuarios()

  }

  const handleChange=(e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    })

  }

  const guardarUsuario=async()=>{

    await axiosClient.post("/usuarios/crear",form)

    setShowModal(false)

    obtenerUsuarios()

  }

  return(

    <CrudLayout
      title="Usuarios"
      onAdd={()=>setShowModal(true)}
    >

      <UsersTable
        lista={lista}
        onDelete={eliminarUsuario}
        onEdit={(user)=>{

          setForm(user)
          setShowModal(true)

        }}
      />

      <UserModal
        show={showModal}
        onClose={()=>setShowModal(false)}
        form={form}
        onChange={handleChange}
        onSave={guardarUsuario}
      />

    </CrudLayout>

  )

}