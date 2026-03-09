import Input from "../../atoms/Users/formInput"
import Select from "../../atoms/Users/selectItem"

export default function UserForm({
    form,
    onChange
    }){

    return(

        <div className="row g-3">

        <Input
            label="Correo"
            name="correo_electronico"
            value={form.correo_electronico}
            onChange={onChange}
        />

        <Input
            label="Identificación"
            name="identificacion"
            value={form.identificacion}
            onChange={onChange}
        />

        <Input
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
        />

        <Input
            label="Apellidos"
            name="apellidos"
            value={form.apellidos}
            onChange={onChange}
        />

        <Select
            label="Estado"
            name="estado"
            value={form.estado}
            onChange={onChange}
            options={[
            {value:"activa",label:"Activa"},
            {value:"inactiva",label:"Inactiva"}
            ]}
        />

        </div>

    )

}