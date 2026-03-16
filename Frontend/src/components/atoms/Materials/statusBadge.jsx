export default function StatusBadge({estado}){

    return(

        <span
        className={`badge ${
            estado === "Consumible"
            ? "bg-success"
            : "bg-danger"
        }`}
        >
        {estado}
        </span>

    )

}