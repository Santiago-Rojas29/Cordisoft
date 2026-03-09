import NavIcon from '../atoms/NavIcon';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

export default function UserProfile({ role = "Administrador" }) {
    return (
        <div className="d-flex flex-column align-items-center mb-2">
            <div
                className="rounded-circle d-flex justify-content-center align-items-center mb-2"
                style={{
                    width: '70px',
                    height: '70px',
                    backgroundColor: '#6c757d'
                }}
            >
                <NavIcon icon={faUsers} className="text-white" size="2x" />
            </div>
            <h6 className="mb-0 fw-semibold text-center">{role}</h6>
        </div>
    );
}
