import React from 'react';
import RequestForm from '../../molecules/Requests/requestForm';

export default function RequestFormModal({
    show,
    onClose,
    materialesSeleccionados = [],
    onSave,
    onCantidadChange,
    listaAprendices = [],
    onAprendizChange,
    tipoSolicitud,
    setTipoSolicitud
}) {
    if (!show) return null;

    return (
        <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content shadow-lg border-0" style={{ borderRadius: "12px" }}>
                    
                    <div className="modal-header border-bottom-0 p-4">
                        <h4 className="modal-title fw-bold">Detalles de Solicitud</h4>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body px-4 pb-4 pt-0">
                        <RequestForm 
                            materialesSeleccionados={materialesSeleccionados}
                            onCantidadChange={onCantidadChange}
                            listaAprendices={listaAprendices}
                            onAprendizChange={onAprendizChange}
                            tipoSolicitud={tipoSolicitud}
                            setTipoSolicitud={setTipoSolicitud}
                        />
                    </div>
                    
                    <div className="modal-footer border-top-0 justify-content-center pb-4">
                        <button 
                            type="button" 
                            className="btn btn-success px-5 fw-bold shadow-sm" 
                            style={{ borderRadius: "8px" }}
                            onClick={onSave}
                            disabled={materialesSeleccionados.length === 0}
                        >
                            Aceptar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
