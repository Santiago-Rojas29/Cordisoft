import { useState } from 'react';
import axiosClient from '../../../Api/axiosClient';
import { REPORT_ENDPOINTS } from '../../../Api/api.config';
import { FiltroDeFechas } from '../../molecules/Reports/FiltroDeFechas';
import { ReportSummary } from '../../molecules/Reports/ReportSummary';
import { TablaVacia } from '../../molecules/Reports/TablaVacia';
import { ReportTableRow } from '../../molecules/Reports/ReportTableRow';
import { ReportTable } from './ReportTable';
import { ReportActions, exportarTXT } from './ReportActions';
import { TableCell } from '../../atoms/Reports/TableCell';

const HOY = new Date().toISOString().split('T')[0];
const HACE_UN_MES = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

const COLUMNAS = ['#', 'Material', 'Cantidad', 'Aprendiz', 'Usuario', 'Bodega', 'Fecha'];

export const ReporteDanos = () => {
  const [desde, setDesde] = useState(HACE_UN_MES);
  const [hasta, setHasta] = useState(HOY);
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);

  const buscar = async () => {
    setCargando(true);
    try {
      const res = await axiosClient.get(`${REPORT_ENDPOINTS.danos}?desde=${desde}&hasta=${hasta}`);
      setDatos(res.data);
    } catch {
      setDatos([]);
    } finally {
      setCargando(false);
    }
  };

  const materialesUnicos  = new Set(datos?.map(d => d.material)).size;
  const aprendicesUnicos  = new Set(datos?.map(d => d.aprendiz)).size;

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
            <ReportSummary label="Registros de daño"      valor={datos.length}     color="danger" />
            <ReportSummary label="Materiales únicos"      valor={materialesUnicos} color="warning" />
            <ReportSummary label="Aprendices implicados"  valor={aprendicesUnicos} color="secondary" />
          </div>

          <ReportActions onExportar={() => exportarTXT(datos, 'Reporte de Daños')} />

          <ReportTable columnas={COLUMNAS}>
            {datos.map((row, i) => (
              <ReportTableRow key={i} numero={i + 1}>
                <TableCell className="fw-semibold">{row.material}</TableCell>
                <TableCell><span className="badge bg-danger">{row.cantidad}</span></TableCell>
                <TableCell>{row.aprendiz}</TableCell>
                <TableCell>{row.usuario}</TableCell>
                <TableCell>{row.bodega}</TableCell>
                <TableCell>{row.fecha}</TableCell>
              </ReportTableRow>
            ))}
          </ReportTable>
        </>
      )}

      {datos !== null && datos.length === 0 && <TablaVacia />}
    </>
  );
};
