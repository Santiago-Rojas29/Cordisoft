import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    faHome,
    faUsers,
    faChartLine,
    faBell,
    faBoxOpen,
    faClipboardList,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import '../../components/SideBar.css';
import { useAuth } from '../../auth/authContext.jsx';
import SidebarBrand from '../atoms/SidebarBrand';
import LogoutButton from '../atoms/LogoutButton';
import UserProfile from '../molecules/UserProfile';
import NavigationItem from '../molecules/NavigationItem';
import NavigationGroup from '../molecules/NavigationGroup';

export default function Sidebar() {
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path) => location.pathname.includes(path);

    return (
        <div
            className="d-flex flex-column vh-100 bg-light border-end"
            style={{
                width: '220px',
                backgroundColor: '#f8f9fa'
            }}
        >
            <div className="p-3 bg-white border-bottom">
                <SidebarBrand />
                <UserProfile role="Administrador" />
            </div>

            <div className="flex-grow-1 p-3 overflow-auto">
                <ul className="nav flex-column gap-1">

                    <NavigationGroup
                        label="GESTIÓN"
                        icon={faHome}
                        id="gestionMenu"
                        isOpen={['/materiales', '/areas', '/fichas'].some(path => location.pathname.includes(path))}
                    >
                        <NavigationItem
                            to="/administrador/materiales"
                            icon={faBoxOpen}
                            label="Materiales"
                            isActive={isActive('/materiales')}
                        />
                        <NavigationItem
                            to="/administrador/areas"
                            icon={faChartLine}
                            label="Áreas"
                            isActive={isActive('/areas')}
                        />
                        <NavigationItem
                            to="/administrador/fichas"
                            icon={faClipboardList}
                            label="Fichas"
                            isActive={isActive('/fichas')}
                        />
                    </NavigationGroup>

                    <NavigationItem
                        to="/administrador/usuarios"
                        icon={faUsers}
                        label="USUARIOS"
                        isActive={isActive('/usuarios')}
                        fontSize="0.8rem"
                        padding="10px 12px"
                    />
                    <NavigationItem
                        to="/administrador/reportes"
                        icon={faChartLine}
                        label="REPORTES"
                        isActive={isActive('/reportes')}
                        fontSize="0.8rem"
                        padding="10px 12px"
                    />
                    <NavigationItem
                        to="/administrador/notificaciones"
                        icon={faBell}
                        label="NOTIFICACIONES"
                        isActive={isActive('/notificaciones')}
                        fontSize="0.8rem"
                        padding="10px 12px"
                    />
                    <NavigationItem
                        to="/administrador/actualizarStock"
                        icon={faBoxOpen}
                        label="ACTUALIZAR STOCK"
                        isActive={isActive('/actualizar-stock')}
                        fontSize="0.8rem"
                        padding="10px 12px"
                    />
                    <NavigationItem
                        to="/administrador/solicitudes"
                        icon={faClipboardList}
                        label="SOLICITUDES"
                        isActive={isActive('/solicitudes')}
                        fontSize="0.8rem"
                        padding="10px 12px"
                    />
                    <NavigationItem
                        to="/administrador/verificacionMateriales"
                        icon={faCheckCircle}
                        label="VERIFICACIÓN DE MATERIALES"
                        isActive={isActive('/verificación-materiales')}
                        fontSize="0.8rem"
                        padding="10px 12px"
                    />
                </ul>
            </div>

            <div className="p-3 border-top bg-white">
                <LogoutButton onClick={logout} />
            </div>
        </div>
    );
}
