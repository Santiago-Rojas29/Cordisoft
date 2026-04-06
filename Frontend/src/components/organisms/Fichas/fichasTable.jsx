    import Button from "../../atoms/Users/actionButton"

    export default function FichasTable({lista,onEdit,onDelete}){

    return(

    <table className="table table-bordered">

    <thead>

        <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Estado</th>
        <th>Área</th>
        <th>Usuario</th>
        <th>Código</th>
        <th>Acciones</th>
        </tr>

    </thead>

    <tbody>

    {lista.map(ficha=>(

    <tr key={ficha.id_ficha}>

    <td>{ficha.id_ficha}</td>
    <td>{ficha.nombre}</td>
    <td>{ficha.estado}</td>
    <td>{ficha.area}</td>
    <td>{ficha.usuario}</td>
    <td>{ficha.codigo}</td>

    <td>

    <Button
    label="Editar"
    color="warning"
    onClick={()=>onEdit(ficha)}
    />

    <Button
    label="Eliminar"
    color="danger"
    onClick={()=>onDelete(ficha.id_ficha)}
    />

    </td>

    </tr>

    ))}

    </tbody>

    </table>

    )

    }