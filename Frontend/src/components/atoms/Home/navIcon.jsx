import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavIcon({ icon, size = "1x", className = "" }) {
    return <FontAwesomeIcon icon={icon} size={size} className={className} />;
}