    export default function FichasModal({
    show,
    onClose,
    form,
    areas,
    usuarios,
    onChange,
    onSave,
    modoEdicion
    }){

    if(!show) return null

    return(

    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>

    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">

    <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">

    <div className="modal-header bg-light border-bottom-0 p-4">

    <h5>

    {modoEdicion ? "Editar Ficha" : "Nueva Ficha"}

    </h5>

    <button className="btn-close" onClick={onClose}></button>

    </div>

    <div className="modal-body">

    <div className="mb-3">

    <label>Nombre</label>

    <input
    className="form-control"
    name="nombre"
    value={form.nombre}
    onChange={onChange}
    />

    </div>

    <div className="mb-3">

    <label>Estado</label>

    <select
    className="form-select"
    name="estado"
    value={form.estado}
    onChange={onChange}
    >

    <option value="">Seleccione</option>
    <option value="activa">Activa</option>
    <option value="inactiva">Inactiva</option>

    </select>

    </div>

    <div className="mb-3">

    <label>Área</label>

    <select
    className="form-select"
    name="id_area"
    value={form.id_area}
    onChange={onChange}
    >

    <option value="">Seleccione área</option>

    {areas.map(area => (

    <option
    key={area.id_area}
    value={area.id_area}
    >

    {area.nombre}

    </option>

    ))}

    </select>

    </div>

    <div className="mb-3">

    <label>Usuario</label>

    <select
    className="form-select"
    name="id_usuario"
    value={form.id_usuario}
    onChange={onChange}
    >

    <option value="">Seleccione usuario</option>

    {usuarios.map(usuario => (

    <option
    key={usuario.id_usuario}
    value={usuario.id_usuario}
    >

    {usuario.nombre}

    </option>

    ))}

    </select>

    </div>

    <div className="mb-3">

    <label>Código</label>

    <input
    className="form-control"
    name="codigo"
    value={form.codigo}
    onChange={onChange}
    />

    </div>

    </div>

    <div className="modal-footer border-top-0 bg-light p-4modal-footer">

    <button
    className="btn btn-secondary"
    onClick={onClose}
    >

    Cancelar

    </button>

    <button
    className="btn btn-success"
    onClick={onSave}
    >

    {modoEdicion ? "Actualizar" : "Guardar"}

    </button>

    </div>

    </div>

    </div>

    </div>

)

}