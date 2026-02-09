import { conexionDb } from "../conexionDb/conexionDb.js";

export const crearArea=async(req,resp)=>{
    const {descripcion,nombre,estado,id_usuario}=req.body
    const sql="insert into areas (nombre,estado,id_usuario,descripcion) values(?,?,?,?)"
    const [respuesta]= await conexionDb.query(sql,[nombre,estado,id_usuario,descripcion])
    resp.status(200).json(respuesta)
}

export const listarArea=async(req,resp)=>{
    const sql= "select * from areas"
    const [respuesta]=await conexionDb.query(sql)
    resp.status(200).json(respuesta)


}

export const editarArea=async(req,resp)=>{
    const {id}=req.params
    const {descripcion,nombre,estado,id_usuario}=req.body
    const sql="update areas set descripcion=?,nombre=?,estado=?,id_usuario=? where id_area=?"
    const [respuesta]=await conexionDb.query(sql,[descripcion,nombre,estado,id_usuario,id])
    resp.status(200).json(respuesta)

}

export const eliminarArea=async(req,resp)=>{
    const{id}=req.params
    const sql="delete from areas where id_area=?"
    const [resultado]=await conexionDb.query(sql,[id])
    resp.status(200).json(resultado)
}

export const buscarArea=async(req,resp)=>{
    const{id}=req.params
    const sql="select * from areas where id_area=?"
    const [resultado]=await conexionDb.query(sql,[id])
    resp.status(200).json(resultado)
}