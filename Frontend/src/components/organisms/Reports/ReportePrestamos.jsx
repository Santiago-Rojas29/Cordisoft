import { useState } from 'react';
import axiosClient from '../../../Api/axiosClient';
import { REPORT_ENDPOINTS } from '../../../Api/api.config';
import { FiltroDeFechas } from '../../molecules/Reports/FiltroDeFechas';
import { ReportSummary } from '../../molecules/Reports/ReportSummary';
import { TablaVacia } from '../../molecules/Reports/TablaVacia';
import { ReportTableRow } from '../../molecules/Reports/ReportTableRow';
import { ReportTable } from './ReportTable';
import { ReportActions, exportarTXT } from './ReportActions';
import { EstadoBadge } from '../../atoms/Reports/EstadoBadge';
import { TableCell } from '../../atoms/Reports/TableCell';

const HOY = new Date().toISOString().split('T')[0];
const HACE_UN_MES = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

const COLUMNAS = ['#', 'Usuario', 'Fecha creación', 'Fecha entrega', 'Materiales', 'Estado'];

export const ReportePrestamos = () => {
  const [desde, setDesde] = useState(HACE_UN_MES);
  const [hasta, setHasta] = useState(HOY);
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);

  const buscar = async () => {
    setCargando(true);
    try {
      const res = await axiosClient.get(`${REPORT_ENDPOINTS.prestamos}?desde=${desde}&hasta=${hasta}`);
      setDatos(res.data);
    } catch {
      setDatos([]);
    } finally {
      setCargando(false);
    }
  };

  const activos   = datos?.filter(d => d.estado_prestamo === 'activo').length   ?? 0;
  const devueltos = datos?.filter(d => d.estado_prestamo === 'devuelto').length ?? 0;

  return (
    <>
      <FiltroDeFechas
        desde={desde} hasta={hasta}
        onDesde={setDesde} onHasta={setHasta}
        onBuscar={buscar} cargando={cargando}
      />

      {datos !== null && datos.length > 0 && (
        <>
          <div className="d-flex gap-3 mb-4 flex-wrap">
            <ReportSummary label="Total préstamos" valor={datos.length} color="primary" />
            <ReportSummary label="Activos"         valor={activos}      color="warning" />
            <ReportSummary label="Devueltos"       valor={devueltos}    color="success" />
          </div>

          <ReportActions onExportar={() => exportarTXT(datos, 'Reporte de Préstamos')} />

          <ReportTable columnas={COLUMNAS}>
            {datos.map((row, i) => (
              <ReportTableRow key={row.id_solicitud} numero={i + 1}>
                <TableCell className="fw-semibold">{row.usuario}</TableCell>
                <TableCell>{row.fecha_creacion}</TableCell>
                <TableCell>{row.fecha_entrega ?? '—'}</TableCell>
                <TableCell><span className="badge bg-secondary">{row.cantidad_materiales}</span></TableCell>
                <TableCell><EstadoBadge estado={row.estado_prestamo} /></TableCell>
              </ReportTableRow>
            ))}
          </ReportTable>
        </>
      )}

      {datos !== null && datos.length === 0 && <TablaVacia />}
    </>
  );
};
