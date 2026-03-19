export default function ChatInput({ value, onChange, onSend }) {

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSend();
        }
    };

    return (
        <input
            type="text"
            className="form-control"
            placeholder="Escribe un mensaje..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
        />
    );
}