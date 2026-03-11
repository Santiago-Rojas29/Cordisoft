import axios from "axios";
import axiosClient from "../../services/axiosClient";
import React, { useEffect, useState } from "react";
import Button from "../../components/atoms/Button";
import PageUser from "../../components/pages/UserPage";
import Modal from "../../components/organisms/Modal";
import FormField from "../../components/molecules/FormField";
import SelectField from "../../components/molecules/SelectField";
import SearchBar from "../../components/molecules/SearchBar";
import UserTable from "../../components/organisms/UserTable";
import { toast } from "sonner";

function Usuarios() {
  const [datos, setDatos] = useState({
    id_usuario: "",
    correo_electronico: "",
    identificacion: "",
    nombre: "",
    apellidos: "",
    estado: "",
    id_rol: "",
    contraseña: ""
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [lista, setLista] = useState([{}]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarios, setUsuarios] = useState([])
  const [busqueda, setBusqueda] = useState("")

  const obtenerUsuario = async () => {
    try {
      const respuesta = await axiosClient.get('/usuarios/listar');
      setLista(respuesta.data);
    } catch (error) {
      console.error('Error al mostrar la lista', error);
      toast.error("No se pudieron cargar las áreas");
    }
  };

  useEffect(() => {
    obtenerUsuario();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  const registrarUsuario = async () => {
    const datosProcesados = {
      ...datos,
      id_usuario: Number(datos.id_usuario),
      identificacion: Number(datos.identificacion),
      id_rol: Number(datos.id_rol)
    };

    try {
      let response;

      if (modoEdicion) {
        response = await axiosClient.put(`/usuarios/editar/${idEditar}`, datosProcesados, {
          headers: { 'Content-Type': 'application/json' }
        });
        toast.success("Usuario actualizado correctamente");
        setIdEditar(null);
        setModoEdicion(false);
      } else {
        response = await axiosClient.post('/usuarios/crear', datosProcesados, {
          headers: { 'Content-Type': 'application/json' }
        });
        toast.success(response.data.mensaje || "Material registrado correctamente");
      }

      obtenerUsuario();
      setDatos({ id_usuario:"", correo_electronico: "", identificacion: "", nombre: "", apellidos: "", estado: "", id_rol: "", contraseña: "" });
      setMostrarModal(false); // 👈 Cierra el modal después de guardar

    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al registrar o actualizar Área");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registrarUsuario();
  };

  const eliminarUsuario = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este Usuario?")) return;

    axiosClient.delete(`/usuarios/eliminar/${id}`)
      .then(respuesta => {
        toast.success("Usuario eliminado");
        obtenerUsuario();
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error("No se pudo eliminar la área");
      });
  };

  const actualizarUsuario = (id) => {
    axiosClient.get(`/usuarios/buscar/${id}`)
      .then(respuesta => {
        const usuario = respuesta.data[0];
        setDatos({
          id_usuario: usuario.id_usuario || "",
          correo_electronico: usuario.correo_electronico,
          identificacion: usuario.identificacion,
          nombre: usuario.nombre,
          apellidos: usuario.apellidos,
          estado: usuario.estado,
          id_rol: usuario.id_rol,
          contraseña: usuario.contraseña
        });
        console.log("Respuesta completa:", respuesta.data);
        console.log("Tipo de respuesta.data:", Array.isArray(respuesta.data) ? "Array" : "Objeto");
        setModoEdicion(true);
        setIdEditar(id);
        setMostrarModal(true); // 👈 Abre el modal al editar
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error("No se pudo cargar el área");
      });
  };
  useEffect(() => {

  const delay = setTimeout(async () => {

    if (busqueda.trim() === "") {
      obtenerUsuario()
      return
    }

    const res = await axiosClient.get(`/usuarios/buscar/${busqueda}`)
    setLista(res.data)

  }, 500)

  return () => clearTimeout(delay)

}, [busqueda])


  const abrirModal = () => {
    setDatos({ id_usuario: "", correo_electronico: "", identificacion: "", nombre: "", apellidos: "", estado: "", id_rol: "", contraseña: "" });
    setModoEdicion(false);
    setIdEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setDatos({ id_usuario: "", correo_electronico: "", identificacion: "", nombre: "", apellidos: "", estado: "", id_rol: "", contraseña: "" });
    setModoEdicion(false);
    setIdEditar(null);
  };

  return (
    

      <div className="container-fluid p-4 bg-light min-vh-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Gestión de Usuarios</h2>
                </div>
                <Button variant="success" onClick={abrirModal} className="rounded-pill px-4 shadow-sm">
                    + Agregar Usuario
                </Button>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                    <div className="mb-4">
                        <SearchBar
                        busqueda={busqueda}
                        setBusqueda={setBusqueda}
                        />
                    </div>

                    <UserTable
                        lista={lista}
                        actualizarUsuario={actualizarUsuario}
                        eliminarUsuario={eliminarUsuario}
                    />
                </div>
            </div>
        

      {mostrarModal && (
        <Modal
          show={mostrarModal}
          title={modoEdicion ? "Actualizar Usuario" : "Agregar Nuevo Usuario"}
          submitText={modoEdicion ? "Actualizar" : "Aceptar"}
          onClose={cerrarModal}
          onSubmit={handleSubmit}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <FormField id="correo_electronico" name="correo_electronico" label="Correo" type="email" value={datos.correo_electronico} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <FormField id="identificacion" name="identificacion" label="Identificación" type="number" value={datos.identificacion} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <FormField id="nombre" name="nombre" label="Nombre" value={datos.nombre} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <FormField id="apellidos" name="apellidos" label="Apellidos" value={datos.apellidos} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <SelectField
                id="estado" name="estado" label="Estado" value={datos.estado} onChange={handleChange} required
                options={[
                  { value: 'Activo', label: 'Activa' },
                  { value: 'Inactivo', label: 'Inactiva' }
                ]}
              />
            </div>
            <div className="col-md-12">
              <FormField id="id_rol" name="id_rol" label="ID Rol" type="number" value={datos.id_rol} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <FormField id="contraseña" name="contraseña" label="Contraseña" type="password" value={datos.contraseña} onChange={handleChange} />
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}

export default Usuarios;