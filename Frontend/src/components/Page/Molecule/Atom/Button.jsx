const Button = ({ children, variant = "primary", size = "md", ...props }) => {
    const base = "btn";
    const variants = {
        primary: "btn-primary",
        danger: "btn-danger",
        success: "btn-success",
        warning: "btn-warning",
        info: "btn-info",
        outline: "btn-outline-primary"
    };

    const sizes = {
        sm: "btn-sm",
        md: "",
        lg: "btn-lg"
    };

    return (
        <button
        className={`${base} ${variants[variant]} ${sizes[size]}`}
        {...props}
        >
            {children}
        </button>
    );
};

export default Button;