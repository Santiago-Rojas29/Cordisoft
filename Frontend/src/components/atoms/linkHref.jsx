export const Link=(link)=>{
    return(
        <a href={link} style={styles}>
            ¿Olvidaste tu contraseña?
        </a>
    )
}

const styles={
    display: "block",
    textAlign: "right",
    fontSize: "13px",
    marginBottom:" 1rem",
    color: "#39A900",
    textDecoration: "none",
}