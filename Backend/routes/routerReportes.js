import express from 'express';
import { validarToken } from '../middleware/authMiddleware.js';
import { reportePrestamos, reporteDanos, reporteInventario } from '../controllers/controllerReportes.js';

export const rutasReportes = express.Router()

rutasReportes.get('/prestamos', validarToken, reportePrestamos)
rutasReportes.get('/danos', validarToken, reporteDanos)
rutasReportes.get('/inventario', validarToken, reporteInventario)
