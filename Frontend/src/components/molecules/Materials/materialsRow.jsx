import Button from "../../atoms/Users/actionButton"

export default function UserRow({
    material,
    areas = [],
    bodegas = [],
    fichas = [],
    onEdit,
    onDelete
    }){

    const area = areas.find(a => a.id_area === material.id_area);
    const bodega = bodegas.find(b => b.id_bodega === material.id_bodega);
    const ficha = fichas.find(f => f.id_ficha === material.id_ficha);

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
        <td>{area ? area.nombre : "Global"}</td>
        <td>{material.cantidad}</td>
        <td>{bodega ? bodega.nombre : "Bodega Central"}</td>
        <td>{ficha ? ficha.codigo : "No asig."}</td>

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