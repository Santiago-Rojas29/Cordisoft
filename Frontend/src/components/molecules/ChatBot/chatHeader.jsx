export default function ChatHeader({ onClose }) {
    return (
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <span className="font-semibold">Asistente Cordisoft</span>
        <button onClick={onClose} className="font-bold">X</button>
        </div>
    );
}