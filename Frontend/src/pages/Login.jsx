import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/authContext.jsx"
import axios from "axios"
import "./Login.css"
import fondo from "../assets/fondo-sena.jpg"
import logo from "../assets/logo-tracemath.png"
import { toast } from "sonner"

export default function Login() {
    const [correo_electronico, setEmail] = useState("")
    const [contraseña, setPassword] = useState("")
    const[Error,setError]=useState("")


    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
    const respuesta = await axios.post(
        "http://localhost:3000/login/validar",
        { correo_electronico, contraseña }
    )

    const { user, token } = respuesta.data

    login(user, token)

    toast.success("Inicio de sesión exitoso")

    if (user.rol === "Administrador") {
        navigate("/administrador")
    } else if (user.rol === "Instructor") {
        navigate("/instructor")
    } else {
        toast.error("Rol no permitido")
    }

} catch (err) {
  console.log(err.response?.data);
  toast.error(err.response?.data?.msg || "Error al iniciar sesión");
}
}
    return (
  <div
    className="login-container"
    style={{ backgroundImage: `url(${fondo})` }}
  >
    <div className="login-card">

      <img
        src={logo}
        alt="Trace Math"
        className="login-logo"
      />

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          value={correo_electronico}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
          className="login-input"
          required
        />

        <input
          type="password"
          value={contraseña}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="login-input"
          required
        />

        <a href="#" className="login-forgot">
          ¿Olvidaste tu contraseña?
        </a>

        <button type="submit" className="login-button">
          Ingresar
        </button>

      </form>

    </div>
  </div>
)}
