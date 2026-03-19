export default function ChatHeader({ onClose }) {
    return (
        <div className="d-flex justify-content-between align-items-center bg-primary text-white" style={styles}>
            <span className="fw-semibold">Asistente Cordisoft</span>
            <button className="btn btn-light btn-sm" onClick={onClose}>X</button>
        </div>
    );
}

const styles = {
    padding: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px"
};