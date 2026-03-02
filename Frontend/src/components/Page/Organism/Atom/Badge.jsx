const Badge = ({ children, variant = "primary"}) => {
    const variants = {
        primary: "bg-primary",
        success: "bg-success",
        danger: "bg-danger",
        warning: "bg-warning",
        info: "bg-info",
        secondary: "bg-secondary",
        dark: "bg-dark"
    };

    return (
        <span className={`badge ${variants[variant]}`}>
            {children}
        </span>
    );
};

export default Badge