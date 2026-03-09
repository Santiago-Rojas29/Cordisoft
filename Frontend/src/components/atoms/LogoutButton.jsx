import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function LogoutButton({ onClick }) {
    return (
        <button
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center fw-semibold"
            style={{
                borderRadius: '8px',
                padding: '10px',
                fontSize: '0.9rem'
            }}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
            Cerrar sesión
        </button>
    );
}
