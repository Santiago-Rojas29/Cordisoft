import Button from "../../atoms/Users/actionButton"

export default function UserRow({
    material,
    onEdit,
    onDelete
    }){

    return(

        <tr>

        <td>{material.id_material}</td>
        <td>{material.nombre}</td>
        <td>{material.codigo}</td>
        <td>
            {material.tipo}
        </td>
        <td>{material.estado}</td>
        <td>{material.descripcion}</td>
        <td>{material.id_area}</td>
        <td>{material.cantidad}</td>
        <td>{material.id_bodega}</td>
        <td>{material.id_ficha}</td>

        <td className="d-flex gap-2">

            <Button
            label="Editar"
            color="info"
            onClick={()=>onEdit(material)}
            />

            <Button
            label="Eliminar"
            color="danger"
            onClick={()=>onDelete(material.id_material)}
            />

        </td>

        </tr>

    )

}