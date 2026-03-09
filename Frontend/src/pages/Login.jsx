import fondo from "../assets/fondo-sena.jpg"
import logo from "../assets/logo-tracemath.png"

import { AuthTemplate } from "../components/templates/AuthTemplate"
import { LoginForm } from "../components/organisms/loginForm"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/authContext"

export default function Login() {

    const navigate = useNavigate()
    const { login } = useAuth()

    const handleLoginSuccess = (data) => {

      login(data.user, data.token)

      const rol = data.user.rol

      if (rol === "Administrador") {
        navigate("/administrador")
      } 
      else if (rol === "Instructor") {
        navigate("/instructor")
      }

    }

    return (
      <AuthTemplate
        backgroundImage={fondo}
        logo={logo}
      >
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </AuthTemplate>
    )
}