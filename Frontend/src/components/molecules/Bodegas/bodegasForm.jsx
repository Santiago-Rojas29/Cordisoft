import Input from "../../atoms/Users/formInput"
import Select from "../../atoms/Users/selectItem"

export default function BodegasForm({
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
            label="Ubicación"
            name="ubicacion"
            value={form.ubicacion}
            onChange={onChange}
        />

        <Input
            label="Estado"
            name="estado"
            value={form.estado}
            onChange={onChange}
        />

        <Select
            label="ID (Área)"
            name="id_area"
            value={form.id_area}
            onChange={onChange}
            options={areas.map(area => ({
                value: area.id_area,
                label:area.nombre
            }))}
        />

        </div>

    )

}