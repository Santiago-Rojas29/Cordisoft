import express from 'express'
import {
    materialesNoDevueltos,
    materialesMasDaniados,
    usuariosMorosos,
    materialesMasPrestados,
    prestamosPorMes,
    stockPorBodega,
    aprendicesConDanos,
    tasaDevolucion
} from '../controllers/controllerEstadisticas.js'

const rutasEstadisticas = express.Router()

rutasEstadisticas.get('/materialesNoDevueltos', materialesNoDevueltos)
rutasEstadisticas.get('/materialesDanados', materialesMasDaniados)
rutasEstadisticas.get('/usuariosMorosos', usuariosMorosos)
rutasEstadisticas.get('/materialesMasPrestados', materialesMasPrestados)
rutasEstadisticas.get('/prestamosPorMes', prestamosPorMes)
rutasEstadisticas.get('/stockPorBodega', stockPorBodega)
rutasEstadisticas.get('/aprendicesConDanos', aprendicesConDanos)
rutasEstadisticas.get('/tasaDevolucion', tasaDevolucion)

export default rutasEstadisticas