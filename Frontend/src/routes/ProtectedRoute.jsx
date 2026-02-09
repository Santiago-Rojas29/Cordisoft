import { Navigate } from "react-router-dom"
import { useAuth } from "../auth/authContext.jsx"

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth()

  if (loading) {
    return <p>Cargando...</p>
  }

  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}
