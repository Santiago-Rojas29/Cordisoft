import Button from "../../atoms/Users/actionButton"

export default function BodegasRow({
    bodega,
    onEdit,
    onDelete
    }){

    return(

        <tr>

        <td>{bodega.id_bodega}</td>
        <td>{bodega.nombre}</td>
        <td>{bodega.ubicacion}</td>
        <td>{bodega.estado}</td>

        <td>{bodega.id_area}</td>

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