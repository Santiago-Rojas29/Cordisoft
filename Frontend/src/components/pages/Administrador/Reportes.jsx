import { useState } from 'react';
import axiosClient from '../../Api/axiosClient';
import { REPORT_ENDPOINTS } from '../../Api/api.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt, faExclamationTriangle, faBoxes,
  faSearch, faFilePdf, faSpinner
} from '@fortawesome/free-solid-svg-icons';

const HOY = new Date().toISOString().split('T')[0];
const HACE_UN_MES = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

const ESTADO_BADGE = {
  devuelto: 'bg-success',
  activo:   'bg-warning text-dark',
  vencido:  'bg-danger',
};

function FiltroDeFechas({ desde, hasta, onDesde, onHasta, onBuscar, cargando }) {
  return (
    <div className="d-flex flex-wrap gap-3 align-items-end mb-4">
      <div>
        <label className="form-label small fw-semibold text-muted">Desde</label>
        <input
          type="date" className="form-control"
          value={desde} max={hasta}
          onChange={e => onDesde(e.target.value)}
        />
      </div>
      <div>
        <label className="form-label small fw-semibold text-muted">Hasta</label>
        <input
          type="date" className="form-control"
          value={hasta} min={desde} max={HOY}
          onChange={e => onHasta(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary d-flex align-items-center gap-2"
        onClick={onBuscar} disabled={cargando}
      >
        {cargando
          ? <FontAwesomeIcon icon={faSpinner} spin />
          : <FontAwesomeIcon icon={faSearch} />}
        Buscar
      </button>
    </div>
  );
}

function ExportarPDF(tabla, titulo) {
  const rows = tabla.map(row =>
    Object.values(row).map(v => String(v ?? '')).join('\t')
  ).join('\n');
  const headers = Object.keys(tabla[0] ?? {}).join('\t');
  const contenido = `${titulo}\n\n${headers}\n${rows}`;
  const blob = new Blob([contenido], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${titulo.replace(/ /g, '_')}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function ResumenCard({ label, valor, color }) {
  return (
    <div className={`card border-0 shadow-sm rounded-3 px-4 py-3 text-center`}>
      <div className={`fs-2 fw-bold text-${color}`}>{valor}</div>
      <div className="text-muted small">{label}</div>
    </div>
  );
}

function TablaVacia() {
  return (
    <div className="alert alert-info text-center py-4">
      No se encontraron registros para el período seleccionado.
    </div>
  );
}

function ReportePrestamos() {
  const [desde, setDesde] = useState(HACE_UN_MES);
  const [hasta, setHasta] = useState(HOY);
  const [datos, setDatos]   = useState(null);
  const [cargando, setCargando] = useState(false);

  const buscar = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axiosClient.get(
        `${REPORT_ENDPOINTS.prestamos}?desde=${desde}&hasta=${hasta}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="rounded-3 p-2 bg-primary bg-opacity-10">
          <FontAwesomeIcon icon={faFileAlt} className="text-primary fs-4" />
        </div>
        <div>
          <h5 className="fw-bold mb-0">Reporte de Préstamos</h5>
          <p className="text-muted small mb-0">Historial de préstamos por período</p>
        </div>
      </div>

      <FiltroDeFechas desde={desde} hasta={hasta} onDesde={setDesde} onHasta={setHasta} onBuscar={buscar} cargando={cargando} />

      {datos !== null && datos.length > 0 && (
        <>
          <div className="d-flex gap-3 mb-4 flex-wrap">
            <ResumenCard label="Total préstamos" valor={datos.length} color="primary" />
            <ResumenCard label="Activos"         valor={activos}      color="warning" />
            <ResumenCard label="Devueltos"        valor={devueltos}    color="success" />
          </div>

          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
              onClick={() => ExportarPDF(datos, 'Reporte de Préstamos')}>
              <FontAwesomeIcon icon={faFilePdf} /> Exportar
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Usuario</th>
                  <th>Fecha creación</th>
                  <th>Fecha entrega</th>
                  <th>Materiales</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((row, i) => (
                  <tr key={row.id_solicitud}>
                    <td className="text-muted small">{i + 1}</td>
                    <td className="fw-semibold">{row.usuario}</td>
                    <td>{row.fecha_creacion}</td>
                    <td>{row.fecha_entrega ?? '—'}</td>
                    <td><span className="badge bg-secondary">{row.cantidad_materiales}</span></td>
                    <td>
                      <span className={`badge ${ESTADO_BADGE[row.estado_prestamo] ?? 'bg-secondary'}`}>
                        {row.estado_prestamo}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {datos !== null && datos.length === 0 && <TablaVacia />}
    </div>
  );
}

function ReporteDanos() {
  const [desde, setDesde] = useState(HACE_UN_MES);
  const [hasta, setHasta] = useState(HOY);
  const [datos, setDatos]   = useState(null);
  const [cargando, setCargando] = useState(false);

  const buscar = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axiosClient.get(
        `${REPORT_ENDPOINTS.danos}?desde=${desde}&hasta=${hasta}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDatos(res.data);
    } catch {
      setDatos([]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="rounded-3 p-2 bg-danger bg-opacity-10">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-danger fs-4" />
        </div>
        <div>
          <h5 className="fw-bold mb-0">Reporte de Daños</h5>
          <p className="text-muted small mb-0">Materiales reportados como dañados por período</p>
        </div>
      </div>

      <FiltroDeFechas desde={desde} hasta={hasta} onDesde={setDesde} onHasta={setHasta} onBuscar={buscar} cargando={cargando} />

      {datos !== null && datos.length > 0 && (
        <>
          <div className="d-flex gap-3 mb-4 flex-wrap">
            <ResumenCard label="Registros de daño" valor={datos.length}                                      color="danger" />
            <ResumenCard label="Materiales únicos"  valor={new Set(datos.map(d => d.material)).size}         color="warning" />
            <ResumenCard label="Aprendices implicados" valor={new Set(datos.map(d => d.aprendiz)).size}      color="secondary" />
          </div>

          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
              onClick={() => ExportarPDF(datos, 'Reporte de Daños')}>
              <FontAwesomeIcon icon={faFilePdf} /> Exportar
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Material</th>
                  <th>Cantidad</th>
                  <th>Aprendiz</th>
                  <th>Usuario</th>
                  <th>Bodega</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((row, i) => (
                  <tr key={i}>
                    <td className="text-muted small">{i + 1}</td>
                    <td className="fw-semibold">{row.material}</td>
                    <td><span className="badge bg-danger">{row.cantidad}</span></td>
                    <td>{row.aprendiz}</td>
                    <td>{row.usuario}</td>
                    <td>{row.bodega}</td>
                    <td>{row.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {datos !== null && datos.length === 0 && <TablaVacia />}
    </div>
  );
}

function ReporteInventario() {
  const [datos, setDatos]   = useState(null);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const buscar = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axiosClient.get(REPORT_ENDPOINTS.inventario,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="rounded-3 p-2 bg-success bg-opacity-10">
          <FontAwesomeIcon icon={faBoxes} className="text-success fs-4" />
        </div>
        <div>
          <h5 className="fw-bold mb-0">Reporte de Inventario</h5>
          <p className="text-muted small mb-0">Estado actual de todos los materiales</p>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-3 align-items-end mb-4">
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={buscar} disabled={cargando}
        >
          {cargando
            ? <FontAwesomeIcon icon={faSpinner} spin />
            : <FontAwesomeIcon icon={faSearch} />}
          Cargar inventario
        </button>

        {datos !== null && (
          <div className="flex-grow-1" style={{ maxWidth: 280 }}>
            <input
              type="text" className="form-control"
              placeholder="Filtrar por nombre, bodega o área..."
              value={busqueda} onChange={e => setBusqueda(e.target.value)}
            />
          </div>
        )}
      </div>

      {datos !== null && filtrados.length > 0 && (
        <>
          <div className="d-flex gap-3 mb-4 flex-wrap">
            <ResumenCard label="Tipos de material" valor={filtrados.length}  color="success" />
            <ResumenCard label="Total unidades"    valor={totalUnidades}     color="primary" />
          </div>

          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
              onClick={() => ExportarPDF(filtrados, 'Reporte de Inventario')}>
              <FontAwesomeIcon icon={faFilePdf} /> Exportar
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Material</th>
                  <th>Código</th>
                  <th>Cantidad</th>
                  <th>Estado</th>
                  <th>Bodega</th>
                  <th>Área</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((row, i) => (
                  <tr key={i}>
                    <td className="text-muted small">{i + 1}</td>
                    <td className="fw-semibold">{row.nombre}</td>
                    <td><code>{row.codigo}</code></td>
                    <td><span className="badge bg-primary">{row.cantidad}</span></td>
                    <td>
                      <span className={`badge ${row.estado === 'disponible' ? 'bg-success' : row.estado === 'dañado' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                        {row.estado ?? '—'}
                      </span>
                    </td>
                    <td>{row.bodega}</td>
                    <td>{row.area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {datos !== null && filtrados.length === 0 && <TablaVacia />}
    </div>
  );
}

export default function Reportes() {
  const [tab, setTab] = useState('prestamos');

  const tabs = [
    { key: 'prestamos',  label: 'Préstamos',  icon: faFileAlt },
    { key: 'danos',      label: 'Daños',       icon: faExclamationTriangle },
    { key: 'inventario', label: 'Inventario',  icon: faBoxes },
  ];

  return (
    <div>
      <h1 className="fw-bold mb-4">Gestión de Reportes</h1>

      <ul className="nav nav-tabs mb-4">
        {tabs.map(t => (
          <li className="nav-item" key={t.key}>
            <button
              className={`nav-link d-flex align-items-center gap-2 ${tab === t.key ? 'active fw-semibold' : ''}`}
              onClick={() => setTab(t.key)}
            >
              <FontAwesomeIcon icon={t.icon} />
              {t.label}
            </button>
          </li>
        ))}
      </ul>

      {tab === 'prestamos'  && <ReportePrestamos />}
      {tab === 'danos'      && <ReporteDanos />}
      {tab === 'inventario' && <ReporteInventario />}
    </div>
  );
}
