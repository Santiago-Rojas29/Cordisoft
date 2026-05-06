import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function HamburgerButton({ onClick }) {
    return (
        <button
        className="btn btn-sm"
        onClick={onClick}
        style={styles}
        >
        <FontAwesomeIcon icon={faBars} />
        </button>
    );
}

const styles = {
            border: "none",
            background: "transparent",
            fontSize: "18px"
        }