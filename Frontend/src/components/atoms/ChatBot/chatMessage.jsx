export default function ChatMessage({ text, sender }) {

    const isUser = sender === "user";

    return (
        <div
            className={`d-flex ${isUser ? "justify-content-end" : "justify-content-start"} mb-2`}
        >
            <div style={isUser ? userStyle : botStyle}>
                {text}
            </div>
        </div>
    );
}

const userStyle = {
    backgroundColor: "#0d6efd",
    color: "white",
    padding: "8px 12px",
    borderRadius: "10px",
    maxWidth: "70%"
};

const botStyle = {
    backgroundColor: "#e9ecef",
    color: "black",
    padding: "8px 12px",
    borderRadius: "10px",
    maxWidth: "70%"
};