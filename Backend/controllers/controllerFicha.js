import { conexionDb } from "../conexionDb/conexionDb.js";

export const crearFicha = async (req, resp) => {
    const { nombre, estado, id_area, id_usuario, codigo } = req.body
    const sql = "insert into ficha (nombre, estado, id_area, id_usuario, codigo) values(?,?,?,?,?)"
    const [resultado] = await conexionDb.query(sql, [nombre, estado, id_area, id_usuario, codigo])
    resp.status(200).json(resultado)
}

export const listarFicha = async (req, resp) => {
    const sql = "select * from ficha"
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}

export const editarFicha = async (req, resp) => {
    const { id } = req.params
    const { nombre, estado, id_area, id_usuario, codigo } = req.body
    const sql = "update ficha set nombre=?, estado=?, id_area=?, id_usuario=?, codigo=? where id_ficha=?"
    const [resultado] = await conexionDb.query(sql, [nombre, estado, id_area, id_usuario, codigo, id])
    resp.status(200).json(resultado)
}

export const eliminarFicha = async (req, resp) => {
    const { id } = req.params
    const sql = "delete from ficha where id_ficha=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}

export const buscarFicha = async (req, resp) => {
    const { id } = req.params
    const sql = "select * from ficha where id_ficha=?"
    const [resultado] = await conexionDb.query(sql, [id])
    resp.status(200).json(resultado)
}