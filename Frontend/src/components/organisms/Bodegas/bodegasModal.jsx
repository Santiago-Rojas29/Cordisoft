import Button from "../../atoms/Users/actionButton"
import BodegasForm from "../../molecules/Bodegas/bodegasForm"

export default function BodegasModal({
    show,
    onClose,
    onSave,
    form,
    handleChange,
    areas
    }){

    if(!show) return null

    return(

        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>

        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">

            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">

            <div className="modal-header bg-light border-bottom-0 p-4">

                <h5>Bodega</h5>

                <button
                className="btn-close"
                onClick={onClose}
                />

            </div>

            <div className="modal-body p-4">

                <BodegasForm
                form={form}
                onChange={handleChange}
                areas={areas}
                />

            </div>

            <div className="modal-footer border-top-0 bg-light p-4">

                <Button
                label="Cancelar"
                color="secondary"
                onClick={onClose}
                />

                <Button
                label="Guardar"
                onClick={onSave}
                />

            </div>

            </div>

        </div>

        </div>

    )

}