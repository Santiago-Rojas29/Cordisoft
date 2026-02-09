import { conexionDb } from "../conexionDb/conexionDb.js";

export const crearDetalleSolicitud = async (req, resp) => {
    const { id_solicitud, id_material, cantidad, id_aprendiz } = req.body
    const sql = "insert into detallesolicitud (id_solicitud, id_material, cantidad, id_aprendiz) values(?,?,?,?)"
    const [resultado] = await conexionDb.query(sql, [id_solicitud, id_material, cantidad, id_aprendiz])
    resp.status(200).json(resultado)
}

export const listarDetalleSolicitud = async (req, resp) => {
    const sql = "select * from detallesolicitud"
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}

export const editarDetalleSolicitud = async (req, resp) => {
    const { id } = req.params
    const { id_solicitud, id_material, cantidad, id_aprendiz } = req.body
    const sql = "update detallesolicitud set id_solicitud=?, id_material=?, cantidad=?, id_aprendiz=? where id_detalle=?"
    const [resultado] = await conexionDb.query(sql, [id_solicitud, id_material, cantidad, id_aprendiz, id])
    resp.status(200).json(resultado)
}

export const eliminarDetalleSolicitud = async (req, resp) => {
    const { id } = req.params
    const sql = "delete from detallesolicitud where id_detalle=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}

export const buscarDetalleSolicitud = async (req, resp) => {
    const { id } = req.params
    const sql = "select * from detallesolicitud where id_detalle=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}