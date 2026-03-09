import NavLink from "../../atoms/Home/navLink";
import NavIcon from "../../atoms/Home/navIcon";

export default function SidebarItem({
    to,
    icon,
    label,
    active,
    collapsed
    }) {

    return (

        <NavLink
        to={to}
        className={`nav-link d-flex align-items-center rounded ${
            active
            ? "bg-success bg-opacity-25 text-success fw-semibold"
            : "text-secondary"
        }`}
        style={{
            padding: "10px",
            justifyContent: collapsed ? "center" : "flex-start"
        }}
        >

        <NavIcon icon={icon} />

        {!collapsed && (
            <span className="ms-2">
            {label}
            </span>
        )}

        </NavLink>

    );

}