export default function ActionButton({
    label,
    onClick,
    color = "primary"
    }) {

    return (
        <button
        className={`btn btn-sm btn-${color}`}
        onClick={onClick}
        >
        {label}
        </button>
    );

}