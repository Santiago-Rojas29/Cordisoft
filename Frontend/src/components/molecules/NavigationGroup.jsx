import NavIcon from '../atoms/NavIcon';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function NavigationGroup({
    label,
    icon,
    id,
    isOpen,
    children,
    backgroundColor = '#28a745',
    padding = '12px 16px',
    fontSize = '0.9rem'
}) {
    return (
        <li className="nav-item mb-2">
            <button
                className="btn btn-gestión w-100 text-start fw-semibold text-white d-flex align-items-center justify-content-between"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${id}`}
                aria-expanded={isOpen}
                aria-controls={id}
                style={{
                    backgroundColor,
                    border: 'none',
                    borderRadius: '8px',
                    padding,
                    fontSize
                }}
            >
                <span>
                    <NavIcon icon={icon} className="me-2" />
                    {label}
                </span>
                <NavIcon icon={faCaretDown} />
            </button>

            <div
                className={`collapse ${isOpen ? 'show' : ''}`}
                id={id}
            >
                <ul className="nav flex-column mt-2 ms-2 gap-1">
                    {children}
                </ul>
            </div>
        </li>
    );
}
