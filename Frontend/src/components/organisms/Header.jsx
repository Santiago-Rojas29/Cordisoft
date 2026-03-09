import Link from '../atoms/NavLink';
import Logo from '../atoms/Logo';

export default function Header() {
    return (
        <div
            className="d-flex align-items-center px-4"
            style={{
                height: "70px",
                backgroundColor: "white",
                borderBottom: "1px solid #ddd"
            }}
        >
            <Logo />
        </div>
    );
}
