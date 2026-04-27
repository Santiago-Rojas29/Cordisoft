import { conexionDb } from "../conexionDb/conexionDb.js"

export const reportePrestamos = async (req, resp) => {
    const { desde, hasta } = req.query
    const fechaDesde = desde || '2000-01-01'
    const fechaHasta = hasta || new Date().toISOString().split('T')[0]

    const sql = `
        SELECT
            s.id_solicitud,
            u.nombre AS usuario,
            DATE_FORMAT(s.fecha_creacion, '%Y-%m-%d') AS fecha_creacion,
            DATE_FORMAT(s.fecha_entrega, '%Y-%m-%d') AS fecha_entrega,
            p.estado_prestamo,
            COUNT(ds.id_detalle) AS cantidad_materiales
        FROM solicitud s
        JOIN usuario u ON s.id_usuario = u.id_usuario
        JOIN prestamo p ON s.id_solicitud = p.id_solicitud
        JOIN detallesolicitud ds ON s.id_solicitud = ds.id_solicitud
        WHERE s.tipo_solicitud = 'prestamo'
            AND s.fecha_creacion BETWEEN ? AND ?
        GROUP BY s.id_solicitud, u.nombre, s.fecha_creacion, s.fecha_entrega, p.estado_prestamo
        ORDER BY s.fecha_creacion DESC
    `
    const [resultado] = await conexionDb.query(sql, [fechaDesde, fechaHasta])
    resp.status(200).json(resultado)
}

export const reporteDanos = async (req, resp) => {
    const { desde, hasta } = req.query
    const fechaDesde = desde || '2000-01-01'
    const fechaHasta = hasta || new Date().toISOString().split('T')[0]

    const sql = `
        SELECT
            m.nombre AS material,
            ds.cantidad,
            COALESCE(a.nombre, 'No asignado') AS aprendiz,
            u.nombre AS usuario,
            DATE_FORMAT(s.fecha_creacion, '%Y-%m-%d') AS fecha,
            COALESCE(b.nombre, 'Sin bodega') AS bodega
        FROM detallesolicitud ds
        JOIN material m ON ds.id_material = m.id_material
        JOIN solicitud s ON ds.id_solicitud = s.id_solicitud
        JOIN usuario u ON s.id_usuario = u.id_usuario
        LEFT JOIN aprendiz a ON ds.id_aprendiz = a.id_aprendiz
        LEFT JOIN bodega b ON m.id_bodega = b.id_bodega
        WHERE ds.estado_item = 'dañado'
            AND s.fecha_creacion BETWEEN ? AND ?
        ORDER BY s.fecha_creacion DESC
    `
    const [resultado] = await conexionDb.query(sql, [fechaDesde, fechaHasta])
    resp.status(200).json(resultado)
}

export const reporteInventario = async (req, resp) => {
    const sql = `
        SELECT
            m.nombre,
            m.codigo,
            m.cantidad,
            m.estado,
            COALESCE(b.nombre, 'Sin bodega') AS bodega,
            COALESCE(a.nombre, 'Sin área') AS area
        FROM material m
        LEFT JOIN bodega b ON m.id_bodega = b.id_bodega
        LEFT JOIN areas a ON m.id_area = a.id_area
        ORDER BY b.nombre, m.nombre
    `
    const [resultado] = await conexionDb.query(sql)
    resp.status(200).json(resultado)
}
