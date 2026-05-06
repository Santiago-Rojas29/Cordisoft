export default function StatusBadge({estado}){

    return(

        <span
        className={`badge ${
            estado === "Activo"
            ? "bg-success"
            : "bg-danger"
        }`}
        >
        {estado}
        </span>

    )

}