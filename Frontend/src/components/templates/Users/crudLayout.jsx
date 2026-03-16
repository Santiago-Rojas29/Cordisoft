export default function CrudLayout({
    title,
    children,
    abrirModal,
    headerAction,
    style
    }){

    return(

        <div className="container-fluid p-4 bg-light min-vh-100" style={{borderRadius:"20px"}}>

        <div className="d-flex justify-content-between align-items-center mb-4">

            <h2 className="fw-bold mb-1">{title}</h2>

            {headerAction ? (
                headerAction
            ) : abrirModal ? (
                <button
                    className="btn btn-primary"
                    onClick={abrirModal}
                >
                    + Agregar nuevo
                </button>
            ) : null}

        </div>

        {children}

        </div>

    )

}