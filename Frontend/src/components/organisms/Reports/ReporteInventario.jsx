import { useState } from 'react';
import axiosClient from '../../../Api/axiosClient';
import { REPORT_ENDPOINTS } from '../../../Api/api.config';
import { ReportSummary } from '../../molecules/Reports/ReportSummary';
import { TablaVacia } from '../../molecules/Reports/TablaVacia';
import { ReportTableRow } from '../../molecules/Reports/ReportTableRow';
import { ReportTable } from './ReportTable';
import { ReportActions, exportarTXT } from './ReportActions';
import { EstadoBadge } from '../../atoms/Reports/EstadoBadge';
import { TableCell } from '../../atoms/Reports/TableCell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

const COLUMNAS = ['#', 'Material', 'Código', 'Cantidad', 'Estado', 'Bodega', 'Área'];

export const ReporteInventario = () => {
  const [datos, setDatos]     = useState(null);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const cargar = async () => {
    setCargando(true);
    try {
      const res = await axiosClient.get(REPORT_ENDPOINTS.inventario);
      setDatos(res.data);
    } catch {
      setDatos([]);
    } finally {
      setCargando(false);
    }
  };

  const filtrados = (datos ?? []).filter(d =>
    d.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.bodega?.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.area?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalUnidades = filtrados.reduce((acc, d) => acc + (d.cantidad || 0), 0);

  return (
    <>
      <div className="d-flex flex-wrap gap-3 align-items-end mb-4">
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={cargar}
          disabled={cargando}
        >
          <FontAwesomeIcon icon={cargando ? faSpinner : faSearch} spin={cargando} />
          Cargar inventario
        </button>

        {datos !== null && (
          <div className="flex-grow-1" style={{ maxWidth: 300 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar por nombre, bodega o área..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
        )}
      </div>

      {datos !== null && filtrados.length > 0 && (
        <>
          <div className="d-flex gap-3 mb-4 flex-wrap">
            <ReportSummary label="Tipos de material" valor={filtrados.length} color="success" />
            <ReportSummary label="Total unidades"    valor={totalUnidades}    color="primary" />
          </div>

          <ReportActions onExportar={() => exportarTXT(filtrados, 'Reporte de Inventario')} />

          <ReportTable columnas={COLUMNAS}>
            {filtrados.map((row, i) => (
              <ReportTableRow key={i} numero={i + 1}>
                <TableCell className="fw-semibold">{row.nombre}</TableCell>
                <TableCell><code>{row.codigo}</code></TableCell>
                <TableCell><span className="badge bg-primary">{row.cantidad}</span></TableCell>
                <TableCell><EstadoBadge estado={row.estado} /></TableCell>
                <TableCell>{row.bodega}</TableCell>
                <TableCell>{row.area}</TableCell>
              </ReportTableRow>
            ))}
          </ReportTable>
        </>
      )}

      {datos !== null && filtrados.length === 0 && <TablaVacia />}
    </>
  );
};
