import Input from "../../atoms/Users/formInput"
import Select from "../../atoms/Users/selectItem"

export default function MaterialsForm({
    form,
    onChange,
    areas
    }){

    return(

        <div className="row g-4">

        <Input
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
        />

        <Input
            label="Código"
            name="codigo"
            value={form.codigo}
            onChange={onChange}
        />

        <Select
            label="Tipo"
            name="tipo"
            value={form.tipo}
            onChange={onChange}
            options={[
            {value:"consumible",label:"Consumible"},
            {value:"no consumible",label:"No consumible"}
            ]}
        />

        <Input
            label="Estado"
            name="estado"
            value={form.estado}
            onChange={onChange}
        />

        <Input
            label="Descripción"
            name="descripcion"
            value={form.descripcion}
            onChange={onChange}
        />

        <Select
        label="ID (Area)"
        name="id_area"
        value={form.id_area}
        onChange={onChange}
        options={areas.map(area => ({
            value: area.id_area,
            label: area.nombre
        }))}
        />

        <Input
        label="Cantidad"
        name="cantidad"
        value={form.cantidad}
        onChange={onChange}
        />

        <Input
        label="ID (Bodega)"
        name="id_bodega"
        value={form.id_bodega}
        onChange={onChange}
        />

        <Input
        label="ID (Ficha)"
        name="id_ficha"
        value={form.id_ficha}
        onChange={onChange}
        />

        </div>

    )

}