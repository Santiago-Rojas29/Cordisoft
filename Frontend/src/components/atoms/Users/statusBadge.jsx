export default function StatusBadge({estado}){

    return(

        <span
        className={`badge ${
            estado === "activa"
            ? "bg-success"
            : "bg-danger"
        }`}
        >
        {estado}
        </span>

    )

}