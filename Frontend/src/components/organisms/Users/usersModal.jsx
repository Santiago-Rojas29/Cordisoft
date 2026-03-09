import Button from "../../atoms/Users/actionButton"
import UserForm from "../../molecules/Users/userForm"

export default function UserModal({
    show,
    onClose,
    onSave,
    form,
    onChange
    }){

    if(!show) return null

    return(

        <div className="modal show d-block">

        <div className="modal-dialog">

            <div className="modal-content">

            <div className="modal-header">

                <h5>Usuario</h5>

                <button
                className="btn-close"
                onClick={onClose}
                />

            </div>

            <div className="modal-body">

                <UserForm
                form={form}
                onChange={onChange}
                />

            </div>

            <div className="modal-footer">

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