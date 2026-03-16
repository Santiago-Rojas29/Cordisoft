import Button from "../../atoms/Users/actionButton"
import AreaForm from "../../molecules/Areas/areaForm"

export default function AreaModal({
    show,
    onClose,
    onSave,
    form,
    onChange,
    modoEdicion,
    usuarios
    }){

    if(!show) return null

    return(

        <div
        className="modal fade show d-block"
        style={{backgroundColor:"rgba(0,0,0,0.5)"}}
        >

        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">

            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">

            <div className="modal-header bg-light border-bottom-0 p-4">

                <h5>
                {modoEdicion
                    ? "Actualizar Área"
                    : "Nueva Área"}
                </h5>

                <button
                className="btn-close"
                onClick={onClose}
                />

            </div>

            <div className="modal-body">

                <AreaForm
                form={form}
                onChange={onChange}
                usuarios={usuarios}
                />

            </div>

            <div className="modal-footer border-top-0 bg-light p-4modal-footer">

                <Button
                label="Cancelar"
                color="secondary"
                onClick={onClose}
                />

                <Button
                label={modoEdicion ? "Actualizar":"Guardar"}
                color="success"
                onClick={onSave}
                />

            </div>

            </div>

        </div>

        </div>

    )

}