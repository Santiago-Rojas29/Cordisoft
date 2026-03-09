import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Instructor from "./pages/Instructor.jsx"
import ProtectedRoute from "./routes/ProtectedRoute"
import AdminLayout from "./layouts/AdminLayout.jsx"

import Dashboard from "./pages/Administrador/Dashboard.jsx"
import Areas from "./pages/Administrador/Areas.jsx"
import Fichas from "./pages/Administrador/Fichas.jsx"
import Materiales from "./pages/Administrador/Materiales.jsx"
import Notificaciones  from "./pages/Administrador/Notificaciones.jsx"
import Reportes from "./pages/Administrador/Reportes.jsx"
import Usuarios from "./pages/Administrador/Usuarios.jsx"
import Solicitudes from "./pages/Administrador/Solicitudes.jsx"
import VerificacionMateriales from "./pages/Administrador/VerificacionMateriales.jsx"
import ActualizarStock from "./pages/Administrador/ActualizarStock.jsx"
import Home from "./pages/Administrador/Home.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/administrador"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="areas" element={<Areas />} />
          <Route path="fichas" element={<Fichas />} />
          <Route path="materiales" element={<Materiales />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          <Route path="notificaciones" element={<Notificaciones />} />
          <Route path="actualizarStock" element={<ActualizarStock />} />
          <Route path="verificacionMateriales" element={<VerificacionMateriales/>} />
        </Route>

        <Route
          path="/instructor"
          element={
            <ProtectedRoute>
              <Instructor />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
