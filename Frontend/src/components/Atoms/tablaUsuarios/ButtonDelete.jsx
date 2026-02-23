export const ButtonDelete = ({ children, onClick, className, type = "button"}) => {
    return (
        <button
        type={type}
        className={className}
        onClick={onClick}
        >
            {children}
        </button>
    );
};