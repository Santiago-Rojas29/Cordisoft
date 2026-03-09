import React from 'react';
import ModalBackdrop from "../atoms/ModalBackdrop";
import Button from "../atoms/Button";

const Modal = ({ show, title, onClose, onSubmit, submitText = "Aceptar", children }) => {
    if (!show) return null;

    return (
        <>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">

                        <div className="modal-header bg-light border-bottom-0 p-4">
                            <h5 className="modal-title fw-bold text-dark">{title}</h5>
                            <button type="button" className="btn-close shadow-none" onClick={onClose}></button>
                        </div>

                        <form onSubmit={onSubmit}>
                            <div className="modal-body p-4">
                                {children}
                            </div>

                            <div className="modal-footer border-top-0 bg-light p-4">
                                <Button variant="secondary" onClick={onClose} className="rounded-pill px-4 shadow-sm" type="button">
                                    Cancelar
                                </Button>
                                <Button variant="success" type="submit" className="rounded-pill px-4 shadow-sm">
                                    {submitText}
                                </Button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <ModalBackdrop />
        </>
    );
};

export default Modal;
