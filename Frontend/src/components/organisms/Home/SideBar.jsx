import { useLocation } from "react-router-dom";
import { useAuth } from "../../../auth/authContext";

import SidebarBrand from "../../atoms/Home/sideBarBrand";
import LogoutButton from "../../atoms/Home/logoutButton";
import HamburgerButton from "../../atoms/Home/hamburguerButton";

import SidebarItem from "../../molecules/Home/sideBarItem";
import SidebarUser from "../../molecules/Home/sideBarUser";

    import {
    faUsers,
    faChartLine,
    faBell,
    faBoxOpen,
    faClipboardList,
    faCheckCircle
    } from "@fortawesome/free-solid-svg-icons";

    export default function Sidebar({ collapsed, toggleSidebar }) {

    const location = useLocation();
    const { logout, user } = useAuth();

    const isActive = (path) => location.pathname === path;

    return (

        <div
        className="d-flex flex-column vh-100 border-end"
        style={{
            width: collapsed ? "70px" : "230px",
            transition: "width 0.3s",
            background: "#f8f9fa"
        }}
        >


        <div className="p-3 border-bottom">

            <div className="d-flex align-items-center justify-content-between">

            {!collapsed && <SidebarBrand />}

            <HamburgerButton onClick={toggleSidebar} />

            </div>

            {!collapsed && (
            <SidebarUser role={user?.rol || "Administrador"} />
            )}

        </div>


        {/* MENU */}

        <div className="flex-grow-1 p-2">

            <SidebarItem
            to="/administrador/materiales"
            icon={faBoxOpen}
            label="Materiales"
            active={isActive("/administrador/materiales")}
            collapsed={collapsed}
            />

            <SidebarItem
            to="/administrador/areas"
            icon={faChartLine}
            label="Áreas"
            active={isActive("/administrador/areas")}
            collapsed={collapsed}
            />

            <SidebarItem
            to="/administrador/fichas"
            icon={faClipboardList}
            label="Fichas"
            active={isActive("/administrador/fichas")}
            collapsed={collapsed}
            />

            <SidebarItem
            to="/administrador/usuarios"
            icon={faUsers}
            label="Usuarios"
            active={isActive("/administrador/usuarios")}
            collapsed={collapsed}
            />

            <SidebarItem
            to="/administrador/reportes"
            icon={faChartLine}
            label="Reportes"
            active={isActive("/administrador/reportes")}
            collapsed={collapsed}
            />

            <SidebarItem
            to="/administrador/notificaciones"
            icon={faBell}
            label="Notificaciones"
            active={isActive("/administrador/notificaciones")}
            collapsed={collapsed}
            />

            <SidebarItem
            to="/administrador/actualizarStock"
            icon={faBoxOpen}
            label="Actualizar Stock"
            active={isActive("/administrador/actualizarStock")}
            collapsed={collapsed}
            />

            <SidebarItem
            to="/administrador/solicitudes"
            icon={faClipboardList}
            label="Solicitudes"
            active={isActive("/administrador/solicitudes")}
            collapsed={collapsed}
            />

            <SidebarItem
            to="/administrador/verificacionMateriales"
            icon={faCheckCircle}
            label="Verificación"
            active={isActive("/administrador/verificacionMateriales")}
            collapsed={collapsed}
            />

        </div>


        {/* FOOTER */}

        <div className="p-3 border-top">

            {!collapsed && (
            <LogoutButton onClick={logout} />
            )}

        </div>

        </div>

    );

    }