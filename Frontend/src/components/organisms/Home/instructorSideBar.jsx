import { useLocation } from "react-router-dom";
import { useAuth } from "../../../auth/authContext";

import SidebarBrand from "../../atoms/Home/sideBarBrand";
import LogoutButton from "../../atoms/Home/logoutButton";
import HamburgerButton from "../../atoms/Home/hamburguerButton";

import SidebarItem from "../../molecules/Home/sideBarItem";
import SidebarUser from "../../molecules/Home/sideBarUser";

import {
  faUsers,
  faBell,
  faBoxOpen,
  faClipboardList,
  faCheckCircle,
  faHome
} from "@fortawesome/free-solid-svg-icons";

export default function InstructorSidebar({ collapsed, toggleSidebar }) {

  const location = useLocation();
  const { logout, user } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (

    <div
      className="d-flex flex-column vh-100 border-end sidebar-container"
      style={{
        width: collapsed ? "70px" : "250px",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >

      <div className="p-3 border-bottom">

        <div className="d-flex align-items-center justify-content-between">

          {!collapsed && <SidebarBrand />}

          <HamburgerButton onClick={toggleSidebar} />

        </div>

        {!collapsed && (
          <SidebarUser role={user?.rol || "Instructor"} />
        )}

      </div>



      <div className="flex-grow-1 p-2">

        <SidebarItem
          to="/instructor/usuario"
          icon={faUsers}
          label="Usuario"
          active={isActive("/instructor/usuario")}
          collapsed={collapsed}
        />

        <SidebarItem
          to="/instructor/dashboard"
          icon={faHome}
          label="Dashboard"
          active={isActive("/instructor/dashboard")}
          collapsed={collapsed}
        />

        <SidebarItem
          to="/instructor/notificaciones"
          icon={faBell}
          label="Notificaciones"
          active={isActive("/instructor/notificaciones")}
          collapsed={collapsed}
        />

        <SidebarItem
          to="/instructor/solicitar"
          icon={faBoxOpen}
          label="Nueva Solicitud"
          active={isActive("/instructor/solicitar")}
          collapsed={collapsed}
        />

        <SidebarItem
          to="/instructor/historial-solicitudes"
          icon={faClipboardList}
          label="Historial Solicitudes"
          active={isActive("/instructor/historial-solicitudes")}
          collapsed={collapsed}
        />



      </div>

      <div className="p-3 border-top">

        {!collapsed && (
          <LogoutButton onClick={logout} />
        )}

      </div>

    </div>

  );

}
