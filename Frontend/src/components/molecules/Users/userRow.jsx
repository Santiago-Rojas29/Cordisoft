import Button from "../../atoms/Users/actionButton"
import StatusBadge from "../../atoms/Users/statusBadge"

export default function UserRow({
    usuario,
    onEdit,
    onDelete
    }){

    return(

        <tr>

        <td>{usuario.id_usuario}</td>
        <td>{usuario.correo_electronico}</td>
        <td>{usuario.identificacion}</td>
        <td className="fw-medium">{usuario.nombre}</td>
        <td>{usuario.apellidos}</td>

        <td>
            <StatusBadge estado={usuario.estado}/>
        </td>

        <td>{usuario.id_rol}</td>

        <td className="d-flex gap-2">

            <Button
            label="Editar"
            color="info"
            onClick={()=>onEdit(usuario)}
            />

            <Button
            label="Eliminar"
            color="danger"
            onClick={()=>onDelete(usuario.id_usuario)}
            />

        </td>

        </tr>

    )

}