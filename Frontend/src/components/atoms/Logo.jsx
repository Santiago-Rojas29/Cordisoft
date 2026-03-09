import logo from "../../../assets/logo-tracemath.png";

export default function Logo({ height = "40px" }) {
    return <img src={logo} alt="Logo" style={{ height }} />;
}
