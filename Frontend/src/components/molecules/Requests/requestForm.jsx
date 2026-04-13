import SearchableSelect from '../Shared/searchableSelect';
import Input from '../../atoms/Users/formInput';

export default function RequestForm({ 
    materialesSeleccionados, 
    onCantidadChange,
    listaAprendices = [],
    areas = [],
    onAprendizChange,
    tipoSolicitud,
    setTipoSolicitud 
}) {

    return (
        <div className="text-start">

            <div className="mb-4">
                <label className="form-label fw-bold">Tipo de Solicitud</label>
                <select 
                    className="form-select w-50"
                    value={tipoSolicitud}
                    onChange={(e) => setTipoSolicitud(e.target.value)}
                >
                    <option value="solicitud">Solicitud Normal</option>
                    <option value="prestamo">Préstamo</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="form-label fw-bold">Materiales Elegidos</label>
                
                {materialesSeleccionados.length === 0 ? (
                    <div className="alert alert-warning py-2 mb-0">No has seleccionado ningún material.</div>
                ) : (
                    <div className="table-responsive border rounded">
                        <table className="table table-sm table-borderless align-middle text-center mb-0">
                            <thead className="table-light text-secondary border-bottom">
                                <tr>
                                    <th className="text-start">Elemento</th>
                                    <th>Categoría</th>
                                    <th>Stock</th>
                                    <th>Área</th>
                                    <th>Ubicación</th>
                                    <th style={{ width: "100px" }}>Cantidad</th>
                                    <th style={{ width: "180px" }}>Aprendiz</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materialesSeleccionados.map((item) => {
                                    const area = areas.find(a => a.id_area === item.id_area);
                                    return (
                                    <tr key={item.id_material} className="border-bottom">
                                            <td className="text-start fw-bold">{item.nombre}</td>
                                            <td>{item.tipo}</td>
                                            <td>{item.cantidad_stock}</td>
                                            <td>{area ? area.nombre : "General"}</td>
                                            <td>{item.ubicacion || "N/A"}</td>
                                            <td>
                                            <input 
                                                type="number" 
                                                className="form-control form-control-sm text-center"
                                                min="1"
                                                max={item.cantidad_stock}
                                                value={item.cantidad_solicitada}
                                                onChange={(e) => onCantidadChange(item.id_material, parseInt(e.target.value) || 1)}
                                            />
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column gap-1">
                                                {item.aprendices?.map((apId, idx) => (
                                                    <select 
                                                        key={idx}
                                                        className="form-select form-select-sm"
                                                        value={apId || ""}
                                                        onChange={(e) => onAprendizChange(item.id_material, idx, e.target.value)}
                                                    >
                                                        <option value="">Aprendiz {idx + 1}...</option>
                                                        {listaAprendices.map(ap => (
                                                            <option key={ap.id_aprendiz} value={ap.id_aprendiz}>
                                                                {ap.nombre}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ))}
                                            </div>
                                            </td>
                                    </tr>
                                    )})}
                                </tbody>
                        </table>
                    </div>
                )}
            </div>


            
        </div>
    );
}
