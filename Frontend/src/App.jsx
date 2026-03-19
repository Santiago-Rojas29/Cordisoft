import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/pages/Login"
import Instructor from "./components/pages/Instructor/Instructor.jsx"
import ProtectedRoute from "./routes/ProtectedRoute"
import AdminLayout from "./components/templates/Home/adminLayout"
import InstructorLayout from "./components/templates/Home/InstuctorLayout"
import Solicitar from "./components/pages/Instructor/Solicitar.jsx"

import Dashboard from "./components/pages/Administrador/Dashboard.jsx"
import Bodegas from "./components/pages/Administrador/Bodegas.jsx"
import Areas from "./components/pages/Administrador/Areas.jsx"
import Fichas from "./components/pages/Administrador/Fichas.jsx"
import Materiales from "./components/pages/Administrador/Materiales.jsx"
import Notificaciones  from "./components/pages/Administrador/Notificaciones.jsx"
import Reportes from "./components/pages/Administrador/Reportes.jsx"
import Usuarios from "./components/pages/Administrador/Usuarios.jsx"
import Solicitudes from "./components/pages/Administrador/Solicitudes.jsx"
import VerificacionMateriales from "./components/pages/Administrador/VerificacionMateriales.jsx"
import ActualizarStock from "./components/pages/Administrador/ActualizarStock.jsx"
import ChatBot from "./components/pages/Administrador/ChatBot.jsx"

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
          <Route path="bodegas" element={<Bodegas />} />
          <Route path="areas" element={<Areas />} />
          <Route path="fichas" element={<Fichas />} />
          <Route path="materiales" element={<Materiales />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          <Route path="notificaciones" element={<Notificaciones />} />
          <Route path="actualizarStock" element={<ActualizarStock />} />
          <Route path="verificacionMateriales" element={<VerificacionMateriales/>} />
          <Route path="chatBot" element={<ChatBot/>} />
        </Route>

        <Route
          path="/instructor"
          element={
            <ProtectedRoute>
              <InstructorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Instructor />} />
          <Route path="usuario" element={<Instructor />} />
          <Route path="notificaciones" element={<Instructor />} />
          <Route path="solicitar" element={<Solicitar />} />
          <Route path="historial-solicitudes" element={<Instructor />} />
          <Route path="materiales-asignados" element={<Instructor />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
