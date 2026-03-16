import Button from "../../atoms/Users/actionButton"

export default function AreasTable({
    lista,
    onEdit,
    onDelete
    }){

    return(

        <table className="table table-bordered">

        <thead>

            <tr>

            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Usuario</th>
            <th>Acciones</th>

            </tr>

        </thead>

        <tbody>

            {lista.map(area=>(

            <tr key={area.id_area}>

                <td>{area.id_area}</td>
                <td>{area.nombre}</td>
                <td>{area.estado}</td>
                <td>{area.usuario_nombre}</td>

                <td>

                <Button
                    label="Editar"
                    color="warning"
                    onClick={()=>onEdit(area)}
                />

                <Button
                    label="Eliminar"
                    color="danger"
                    onClick={()=>onDelete(area.id_area)}
                />

                </td>

            </tr>

            ))}

        </tbody>

        </table>

    )

}