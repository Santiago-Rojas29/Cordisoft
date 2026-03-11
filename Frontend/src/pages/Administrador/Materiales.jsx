import Modal from "../../components/organisms/Modal";
import FormField from "../../components/molecules/FormField";
import SelectField from "../../components/molecules/SelectField";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Materiales() {
  const [datos, setDatos] = useState({
    id_material: "",
    nombre: "",
    codigo: "",
    codigo: "",
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
      id_usuario: Number(datos.id_material),
      identificacion: Number(datos.codigo),
      id_rol: Number(datos.id_rol)
    };

    try {
      let response;

      if (modoEdicion) {
        response = await axios.put(`http://localhost:3000/usuarios/editar/${idEditar}`, datosProcesados, {
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
      setDatos({ id_material: "", nombre: "", codigo: "", codigo: "", apellidos: "", estado: "", id_rol: "", contraseña: "" });
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
          id_material: usuario.id_material || "",
          nombre: usuario.nombre,
          codigo: usuario.codigo,
          codigo: usuario.codigo,
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
    setDatos({ id_material: "", nombre: "", codigo: "", codigo: "", apellidos: "", estado: "", id_rol: "", contraseña: "" });
    setModoEdicion(false);
    setIdEditar(null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setDatos({ id_material: "", nombre: "", codigo: "", codigo: "", apellidos: "", estado: "", id_rol: "", contraseña: "" });
    setModoEdicion(false);
    setIdEditar(null);
  };
  return (
    <div className="container-fluid p-4">

      
    </div>
  )

}
