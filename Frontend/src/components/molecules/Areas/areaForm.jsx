import Input from "../../atoms/Users/formInput"
import Select from "../../atoms/Users/selectItem"

export default function AreaForm({
    form,
    onChange,
    usuarios = []
    }){

    return(

        <div className="row g-3">

        <Input
            label="Nombre del Área"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
        />

        <Select
            label="Estado"
            name="estado"
            value={form.estado}
            onChange={onChange}
            options={[
            {value:"",label:"Seleccione"},
            {value:"activa",label:"Activa"},
            {value:"inactiva",label:"Inactiva"}
            ]}
        />

        <Select
            label="Usuario Responsable"
            name="id_usuario"
            value={form.id_usuario}
            onChange={onChange}
            options={[
            {value:"",label:"Seleccione un usuario"},
            ...usuarios.map(usuario=>({
                value:usuario.id_usuario,
                label:usuario.nombre
            }))
            ]}
        />

        <div className="col-md-12">

            <label className="form-label">
            Descripción
            </label>

            <textarea
            className="form-control"
            name="descripcion"
            value={form.descripcion}
            onChange={onChange}
            rows="3"
            />

        </div>

        </div>

    )

}