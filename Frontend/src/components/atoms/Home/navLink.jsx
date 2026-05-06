import { Link } from 'react-router-dom';

export default function NavLink({ to, children, className = "" }) {
    return (
        <Link to={to} className={className} style={styles}>
            {children}
        </Link>
    );
}


const styles={
            padding: "10px 12px",
            fontSize: "10 rem",
            fontWeight: "500"
            }