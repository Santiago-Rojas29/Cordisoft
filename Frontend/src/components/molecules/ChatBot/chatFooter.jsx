import ChatInput from "../../atoms/ChatBot/chatInput";

export default function ChatFooter({ message, setMessage, onSend }) {
    return (
        <div className="p-4 border-t flex gap-2">

        <ChatInput
            value={message}
            onChange={setMessage}
            onSend={onSend}
        />

        <button
            onClick={onSend}
            className="bg-blue-600 text-white px-4 rounded"
        >
            Enviar
        </button>

        </div>
    );
}