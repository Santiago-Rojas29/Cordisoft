import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faChartLine,
  faBell,
  faBoxOpen,
  faClipboardList,
  faCheckCircle,
  faSignOutAlt,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import './SideBar.css'; 
import { useAuth } from '../auth/authContext.jsx';

function Navbar() {
  const location = useLocation();
  const {logout}=useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <div 
      className="d-flex flex-column vh-100 bg-light border-end" 
      style={{ 
        width: '220px',
        backgroundColor: '#f8f9fa'
      }}
    >

      <div className="p-3 bg-white border-bottom">
        <h4 className="fw-bold mb-3" style={{ fontSize: '1.4rem' }}>
          Trace<span style={{ color: '#28a745' }}>≡</span>Mat
        </h4>
        
        <div className="d-flex flex-column align-items-center mb-2">
          <div 
            className="rounded-circle d-flex justify-content-center align-items-center mb-2" 
            style={{ 
              width: '70px', 
              height: '70px',
              backgroundColor: '#6c757d'
            }}
          >
            <FontAwesomeIcon icon={faUsers} className="text-white" size="2x" />
          </div>
          <h6 className="mb-0 fw-semibold text-center">Administrador</h6>
        </div>
      </div>

      <div className="flex-grow-1 p-3 overflow-auto">
        <ul className="nav flex-column gap-1">


          <li className="nav-item mb-2">
            <button
              className="btn btn-gestión w-100 text-start fw-semibold text-white d-flex align-items-center justify-content-between"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#gestionMenu"
              aria-expanded={['/gestion', '/materiales', '/areas', '/fichas'].includes(location.pathname)}
              aria-controls="gestionMenu"
              style={{
                backgroundColor: '#28a745',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '0.9rem'
              }}
            >
              <span>
                <FontAwesomeIcon icon={faHome} className="me-2" />
                GESTIÓN
              </span>
              <FontAwesomeIcon icon={faCaretDown} />
            </button>

            <div 
              className={`collapse ${['/gestion', '/materiales', '/areas', '/fichas'].includes(location.pathname) ? 'show' : ''}`} 
              id="gestionMenu"
            >
              <ul className="nav flex-column mt-2 ms-2 gap-1">
                <li className="nav-item">
                  <Link
                    to="/administrador/materiales"
                    className={`nav-link rounded d-flex align-items-center ${
                      isActive('/materiales') 
                        ? 'bg-success bg-opacity-25 text-success fw-semibold' 
                        : 'text-dark'
                    }`}
                    style={{ 
                      padding: '8px 12px',
                      fontSize: '0.85rem'
                    }}
                  >
                    <FontAwesomeIcon icon={faBoxOpen} className="me-2" style={{ fontSize: '0.9rem' }} />
                    Materiales
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/administrador/areas"
                    className={`nav-link rounded d-flex align-items-center ${
                      isActive('/areas') 
                        ? 'bg-success bg-opacity-25 text-success fw-semibold' 
                        : 'text-dark'
                    }`}
                    style={{ 
                      padding: '8px 12px',
                      fontSize: '0.85rem'
                    }}
                  >
                    <FontAwesomeIcon icon={faChartLine} className="me-2" style={{ fontSize: '0.9rem' }} />
                    Áreas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/administrador/fichas"
                    className={`nav-link rounded d-flex align-items-center ${
                      isActive('/fichas') 
                        ? 'bg-success bg-opacity-25 text-success fw-semibold' 
                        : 'text-dark'
                    }`}
                    style={{ 
                      padding: '8px 12px',
                      fontSize: '0.85rem'
                    }}
                  >
                    <FontAwesomeIcon icon={faClipboardList} className="me-2" style={{ fontSize: '0.9rem' }} />
                    Fichas
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <Link
              to="/administrador/usuarios"
              className={`nav-link rounded d-flex align-items-center ${
                isActive('/usuarios') 
                  ? 'bg-success bg-opacity-25 text-success fw-semibold' 
                  : 'text-secondary'
              }`}
              style={{ 
                padding: '10px 12px',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}
            >
              <FontAwesomeIcon icon={faUsers} className="me-2" style={{ fontSize: '0.85rem' }} />
              USUARIOS
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/administrador/reportes"
              className={`nav-link rounded d-flex align-items-center ${
                isActive('/reportes') 
                  ? 'bg-success bg-opacity-25 text-success fw-semibold' 
                  : 'text-secondary'
              }`}
              style={{ 
                padding: '10px 12px',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}
            >
              <FontAwesomeIcon icon={faChartLine} className="me-2" style={{ fontSize: '0.85rem' }} />
              REPORTES
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/administrador/notificaciones"
              className={`nav-link rounded d-flex align-items-center ${
                isActive('/notificaciones') 
                  ? 'bg-success bg-opacity-25 text-success fw-semibold' 
                  : 'text-secondary'
              }`}
              style={{ 
                padding: '10px 12px',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}
            >
              <FontAwesomeIcon icon={faBell} className="me-2" style={{ fontSize: '0.85rem' }} />
              NOTIFICACIONES
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/administrador/actualizarStock"
              className={`nav-link rounded d-flex align-items-center ${
                isActive('/actualizar-stock') 
                  ? 'bg-success bg-opacity-25 text-success fw-semibold' 
                  : 'text-secondary'
              }`}
              style={{ 
                padding: '10px 12px',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}
            >
              <FontAwesomeIcon icon={faBoxOpen} className="me-2" style={{ fontSize: '0.85rem' }} />
              ACTUALIZAR STOCK
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/administrador/solicitudes"
              className={`nav-link rounded d-flex align-items-center ${
                isActive('/solicitudes') 
                  ? 'bg-success bg-opacity-25 text-success fw-semibold' 
                  : 'text-secondary'
              }`}
              style={{ 
                padding: '10px 12px',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}
            >
              <FontAwesomeIcon icon={faClipboardList} className="me-2" style={{ fontSize: '0.85rem' }} />
              SOLICITUDES
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/administrador/verificacionMateriales"
              className={`nav-link rounded d-flex align-items-center ${
                isActive('/verificacion-materiales') 
                  ? 'bg-success bg-opacity-25 text-success fw-semibold' 
                  : 'text-secondary'
              }`}
              style={{ 
                padding: '10px 12px',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}
            >
              <FontAwesomeIcon icon={faCheckCircle} className="me-2" style={{ fontSize: '0.85rem' }} />
              VERIFICACIÓN DE MATERIALES
            </Link>
          </li>
        </ul>
      </div>


      <div className="p-3 border-top bg-white">
        <button 
          className="btn btn-danger w-100 d-flex align-items-center justify-content-center fw-semibold"
          style={{
            borderRadius: '8px',
            padding: '10px',
            fontSize: '0.9rem'
          }}
            onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Navbar;
