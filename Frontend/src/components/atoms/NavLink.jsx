import { Link } from 'react-router-dom';

export default function NavLink({ to, children, className = "", style = {} }) {
    return (
        <Link to={to} className={className} style={style}>
            {children}
        </Link>
    );
}
