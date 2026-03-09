import NavIcon from '../atoms/NavIcon';
import NavLink from '../atoms/NavLink';

export default function NavigationItem({ to, icon, label, isActive, iconSize = "0.9rem", fontSize = "0.85rem", padding = "8px 12px" }) {
    return (
        <li className="nav-item">
            <NavLink
                to={to}
                className={`nav-link rounded d-flex align-items-center ${isActive
                        ? 'bg-success bg-opacity-25 text-success fw-semibold'
                        : 'text-dark'
                    }`}
                style={{
                    padding,
                    fontSize
                }}
            >
                <NavIcon icon={icon} className="me-2" style={{ fontSize: iconSize }} />
                {label}
            </NavLink>
        </li>
    );
}
