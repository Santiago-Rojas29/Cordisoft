import { conexionDb } from "../conexionDb/conexionDb.js";

export const crearSolicitud = async (req, resp) => {
    const { id_usuario, tipo_solicitud, fecha_creacion, fecha_entrega, estado } = req.body
    const sql = "insert into solicitud (id_usuario, tipo_solicitud, fecha_creacion, fecha_entrega, estado) values(?,?,?,?,?)"
    const [resultado] = await conexionDb.query(sql, [id_usuario, tipo_solicitud, fecha_creacion, fecha_entrega, estado])
    resp.status(200).json(resultado)
}

export const listarSolicitud = async (req, resp) => {
    const sql = "select * from solicitud"
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}

export const editarSolicitud = async (req, resp) => {
    const { id } = req.params
    const { id_usuario, tipo_solicitud, fecha_creacion, fecha_entrega, estado } = req.body
    const sql = "update solicitud set id_usuario=?, tipo_solicitud=?, fecha_creacion=?, fecha_entrega=?, estado=? where id_solicitud=?"
    const [resultado] = await conexionDb.query(sql, [id_usuario, tipo_solicitud, fecha_creacion, fecha_entrega, estado, id])
    resp.status(200).json(resultado)
}

export const eliminarSolicitud = async (req, resp) => {
    const { id } = req.params
    const sql = "delete from solicitud where id_solicitud=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}

export const buscarSolicitud = async (req, resp) => {
    const { id } = req.params
    const sql = "select * from solicitud where id_solicitud=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}