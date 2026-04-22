import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const servidor = express();

servidor.use(bodyParser.json())
servidor.use(cors({
    origin: ["http://localhost:5173", "http://192.168.101.73"],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));

import rutasArea from './routes/routerArea.js';
servidor.use('/api/areas',rutasArea)

import rutasRoles from './routes/routerRol.js';
servidor.use('/api/roles',rutasRoles)

import rutasUsuarios from './routes/routerUsuario.js';
servidor.use('/api/usuarios',rutasUsuarios)

import rutasFichas from './routes/routerFicha.js';
servidor.use('/api/fichas',rutasFichas)

import rutasMateriales from './routes/routerMaterial.js';
servidor.use('/api/materiales',rutasMateriales)

import rutasBodegas from './routes/routerBodega.js';
servidor.use('/api/bodegas',rutasBodegas)

import rutasAprendices from './routes/routerAprendiz.js';
servidor.use('/api/aprendices',rutasAprendices)

import rutasMovimientoInventario from './routes/routerMovimientoInventario.js';
servidor.use('/api/movimientos',rutasMovimientoInventario)

import rutasSolicitudes from './routes/routerSolicitud.js';
servidor.use('/api/solicitudes',rutasSolicitudes)

import rutasDetalleSolicitud from './routes/routerDetalleSolicitud.js';
servidor.use('/api/detalleSolicitudes',rutasDetalleSolicitud)

import routeAuth from './routes/routerLogin.js';
servidor.use("/api/login",routeAuth)

import rutasEstadisticas from './routes/routerEstadisticas.js';
servidor.use("/api/estadisticas",rutasEstadisticas)

import { rutasReportes } from './routes/routerReportes.js';
servidor.use("/api/reportes", rutasReportes)



servidor.listen(3000,()=>{
    console.log("Servidor corriendo en el puerto 3000")

})
