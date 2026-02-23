import axios from "axios";
import React, { useEffect, useState } from "react";
import { ButtonDelete } from "../../components/Atoms/tablaUsuarios/ButtonDelete";
import { ButtonEdit } from "../../components/Atoms/tablaUsuarios/ButtonEdit";
import { estadoTablas } from "../../components/Atoms/tablaUsuarios/ButtonStatus";
import { buttonAdd } from "../../components/Atoms/ButtonAdd";
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

  const obtenerUsuario = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/usuarios/listar');
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
        response = await axios.put(`http://localhost:3000/usuarios/actualizar/${idEditar}`, datosProcesados, {
          headers: { 'Content-Type': 'application/json' }
        });
        toast.success("Usuario actualizado correctamente");
        setIdEditar(null);
        setModoEdicion(false);
      } else {
        response = await axios.post('http://localhost:3000/usuarios/crear', datosProcesados, {
          headers: { 'Content-Type': 'application/json' }
        });
        toast.success(response.data.mensaje || "Material registrado correctamente");
      }

      obtenerUsuario();
      setDatos({ id_usuario: "", correo_electronico: "", identificacion: "", nombre: "", apellidos: "", estado: "", id_rol: "", contraseña: "" });
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

    axios.delete(`http://localhost:3000/usuarios/eliminar/${id}`)
      .then(respuesta => {
        toast.success(respuesta.data || "Usuario eliminado");
        obtenerUsuario();
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error("No se pudo eliminar la área");
      });
  };

  const actualizarUsuario = (id) => {
    axios.get(`http://localhost:3000/usuarios/buscar/${id}`)
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
    <div className="container-fluid p-4">
      <div className="card shadow-sm" style={{width:1370, display:"flex", marginTop:80}}>
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h2 className="mb-0">USUARIOS</h2>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar..."
              style={{ width: '500px', borderRadius:15 }}
            />
            <button className="btn btn-outline-primary btn-sm" style={{marginLeft:400}}>Buscar</button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle" style={{width:1335}}>
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Correo</th>
                  <th>Identicacion</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Estado</th>
                  <th>ID (Rol)</th>
                  <th>Contraseña</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {lista.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-4">No hay Usuarios registrados</td>
                  </tr>
                ) : (
                  lista.map((usuario) => (
                    <tr key={usuario.id_usuario}>
                      <td>{usuario.id_usuario}</td>
                      <td>{usuario.correo_electronico}</td>
                      <td>{usuario.identificacion}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.apellidos}</td>
                      <td>
                        <estadoTablas className={`badge ${usuario.estado === 'activa' ? 'bg-success' : 'bg-danger'}`}>
                          {usuario.estado === 'activa' ? 'Activa' : 'Inactiva'}
                        </estadoTablas>
                      </td>
                      <td>{usuario.id_rol}</td>
                      <td>{usuario.contraseña || 'Sin descripción'}</td>
                      <td>
                        <ButtonEdit
                          className="btn btn-sm btn-info me-1"
                          onClick={() => actualizarUsuario(usuario.id_usuario)}
                        >
                          Editar
                        </ButtonEdit>
                        <ButtonDelete
                          className="btn btn-sm btn-danger"
                          onClick={() => eliminarUsuario(usuario.id_usuario)}
                        >
                          Eliminar
                        </ButtonDelete>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <buttonAdd
          className="btn btn-success"
          onClick={abrirModal}
        >
          Agregar Usuario
        </buttonAdd>
      </div>

      {mostrarModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{height:600}}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {modoEdicion ? "Actualizar Material" : "Agregar Nuevo Material"}
                </h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="id_areas" className="form-label" style={{height:45}}>ID Usuario</label>
                      <input type="number" className="form-control" id="id_usuario" name="id_usuario" value={datos.id_usuario} onChange={handleChange} required disabled={modoEdicion} 
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="nombre" className="form-label" style={{height:45}}>Correo</label>
                      <input type="email" className="form-control" id="correo_electronico" name="correo_electronico" value={datos.correo_electronico} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="nombre" className="form-label" style={{height:45}}>Identificacion</label>
                      <input type="number" className="form-control" id="identificacion" name="identificacion" value={datos.identificacion} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="nombre" className="form-label" style={{height:45}}>Nombre</label>
                      <input type="text" className="form-control" id="nombre" name="nombre" value={datos.nombre} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="nombre" className="form-label" style={{height:45}}>Apellidos</label>
                      <input type="text" className="form-control" id="apellidos" name="apellidos" value={datos.apellidos} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="estado" className="form-label" style={{height:45}}>Estado</label>
                      <select className="form-select" id="estado" name="estado" value={datos.estado} onChange={handleChange} required>
                        <option value="">Seleccione</option>
                        <option value="Activo">Activa</option>
                        <option value="Inactivo">Inactiva</option>
                      </select>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="descripcion" className="form-label" style={{height:45}}>ID Rol</label>
                      <input type="number" className="form-control" id="id_rol" name="id_rol" value={datos.id_rol} onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="id_usuario" className="form-label" style={{height:45}}>Contraseña</label>
                      <input type="password" className="form-control" id="contraseña" name="contraseña" value={datos.contraseña} onChange={handleChange}/>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-success" onClick={registrarUsuario}>
                  {modoEdicion ? "Actualizar" : "Aceptar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {mostrarModal && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
}

export default Usuarios;