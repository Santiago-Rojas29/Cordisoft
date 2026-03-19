import SearchableSelect from '../Shared/searchableSelect';
import Input from '../../atoms/Users/formInput';

export default function RequestForm({ form, onChange, materialesSeleccionados, fichas, aprendices, onCantidadChange }) {

    const opcionesFichas = fichas.map(ficha => ({
        value: ficha.id_ficha,
        label: `${ficha.codigo} - ${ficha.nombre}`
    }));

    const opcionesAprendices = aprendices.map(apr => ({
        value: apr.id_aprendiz,
        label: `${apr.documento} - ${apr.nombre} - Ficha ${apr.id_ficha}`
    }));

    return (
        <div className="text-start">

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
                                    <th style={{ width: "120px" }}>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materialesSeleccionados.map((item) => (
                                    <tr key={item.id_material} className="border-bottom">
                                        <td className="text-start fw-bold">{item.nombre}</td>
                                        <td>{item.tipo}</td>
                                        <td>{item.cantidad_stock}</td>
                                        <td>{item.id_area || "General"}</td>
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="row g-4 mt-2">
                
                <div className="col-md-12">
                    <label className="form-label fw-bold">Elija el ID de ficha *</label>
                    <SearchableSelect 
                        name="id_ficha"
                        options={opcionesFichas}
                        value={form.id_ficha}
                        onChange={onChange}
                        placeholder="Buscar ID de ficha o nombre..."
                    />
                </div>

                <div className="col-md-12">
                    <label className="form-label fw-bold">Elija los aprendices de la ficha *</label>
                    <SearchableSelect 
                        name="id_aprendiz"
                        options={opcionesAprendices}
                        value={form.id_aprendiz}
                        onChange={onChange}
                        placeholder="Buscar por identificación o nombre..."
                    />
                </div>
                
            </div>
            
        </div>
    );
}
