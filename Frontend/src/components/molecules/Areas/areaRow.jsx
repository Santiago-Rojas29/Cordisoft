import Button from "../../atoms/Users/actionButton"
import StatusBadge from "../../atoms/Users/statusBadge"

export default function AreaRow({area,onEdit,onDelete}){

    return(

        <tr>

        <td>{area.id_area}</td>
        <td>{area.nombre}</td>

        <td>
            <StatusBadge estado={area.estado}/>
        </td>

        <td>{area.id_usuario}</td>

        <td>{area.descripcion || "Sin descripción"}</td>

        <td className="d-flex gap-2">

            <Button
            label="Editar"
            color="info"
            onClick={()=>onEdit(area)}
            />

            <Button
            label="Eliminar"
            color="danger"
            onClick={()=>onDelete(area.id_area)}
            />

        </td>

        </tr>

    )

}