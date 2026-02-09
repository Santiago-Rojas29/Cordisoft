import logo from "../assets/logo-tracemath.png"

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
        <img src={logo} alt="Logo" style={{ height: "40px" }} />
    </div>
    )
}
