import { useState } from "react";
import ChatHeader from "../../molecules/ChatBot/chatHeader";
import ChatFooter from "../../molecules/ChatBot/chatFooter";
import ChatMessageList from "./chatMessageList";

export default function ChatSidebar({ isOpen, onClose }) {

    const [messages, setMessages] = useState([
        { text: "Hola 👋 soy tu asistente, ¿en qué puedo ayudarte?", sender: "bot" }
    ]);

    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const handleSend = () => {
        if (!message.trim()) return;

        const newMessages = [
        ...messages,
        { text: message, sender: "user" },
        { text: "Procesando...", sender: "bot" }
        ];

        setMessages(newMessages);
        setMessage("");


    };

    return (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 flex flex-col">

        <ChatHeader onClose={onClose} />

        <ChatMessageList messages={messages} />

        <ChatFooter
            message={message}
            setMessage={setMessage}
            onSend={handleSend}
        />

        <a
            href="https://wa.me/57XXXXXXXXXX"
            target="_blank"
            className="text-center text-blue-600 pb-3"
        >
            Ir a WhatsApp
        </a>

        </div>
    );
}