import ChatMessage from "../../atoms/ChatBot/chatMessage";

export default function ChatMessageList({ messages }) {
    return (
        <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
            <ChatMessage
            key={index}
            text={msg.text}
            sender={msg.sender}
            />
        ))}
        </div>
    );
}