    import Input from "../../atoms/Users/formInput"
    import Select from "../../atoms/Users/selectItem"

    export default function FichaForm({form,onChange}){

    return(

    <div className="row g-4">

    <Input
    label="ID Ficha"
    name="id_ficha"
    value={form.id_ficha}
    onChange={onChange}
    />

    <Input
    label="Nombre"
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

    <Input
    label="ID Área"
    name="id_area"
    value={form.id_area}
    onChange={onChange}
    />

    <Input
    label="ID Usuario"
    name="id_usuario"
    value={form.id_usuario}
    onChange={onChange}
    />

    <Input
    label="Código"
    name="codigo"
    value={form.codigo}
    onChange={onChange}
    />

    </div>

    )

    }