export const buttonAdd = ({children, className, onClick, type= "button"}) => {
    <button
    className={className}
    onClick={onClick}
    type={type}
    >
        {children}
    </button>
}