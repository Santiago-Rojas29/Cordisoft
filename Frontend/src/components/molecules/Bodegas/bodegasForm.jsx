import Input from "../../atoms/Users/formInput"

export default function BodegasForm({
    form,
    onChange
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

        <Input
            label="ID (Área)"
            name="id_area"
            value={form.id_area}
            onChange={onChange}
        />

        </div>

    )

}