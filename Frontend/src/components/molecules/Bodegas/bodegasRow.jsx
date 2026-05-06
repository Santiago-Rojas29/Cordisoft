import Button from "../../atoms/Users/actionButton"

export default function BodegasRow({
    bodega,
    areas,
    onEdit,
    onDelete
    }){

        const area = areas.find(a => a.id_area ===  bodega.id_area)

    return(

        <tr>

        <td>{bodega.id_bodega}</td>
        <td>{bodega.nombre}</td>
        <td>{bodega.ubicacion}</td>
        <td>{bodega.estado}</td>    

        <td>{area ? area.nombre : "Sin area"}</td>

        <td className="d-flex gap-2">

            <Button
            label="Editar"
            color="info"
            onClick={()=>onEdit(bodega)}
            />

            <Button
            label="Eliminar"
            color="danger"
            onClick={()=>onDelete(bodega.id_bodega)}
            />

        </td>

        </tr>

    )

}