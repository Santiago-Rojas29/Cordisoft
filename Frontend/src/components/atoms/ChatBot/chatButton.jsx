import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

export default function ChatButton({ onClick }) {
    return (
        <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            style={styles}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faRobot} />
        </button>
    );
}

const styles = {
    position: "fixed",
    top: "15px",
    right: "15px",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    zIndex: 1000
};