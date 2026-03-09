export default function CrudLayout({
    title,
    children,
    onAdd
    }){

    return(

        <div className="container-fluid">

        <div className="d-flex justify-content-between mb-4">

            <h2>{title}</h2>

            <button
            className="btn btn-primary"
            onClick={onAdd}
            >
            Nuevo
            </button>

        </div>

        {children}

        </div>

    )

}