import { useState, useEffect } from 'react';
import axiosClient from '../../../Api/axiosClient';
import { STATS_ENDPOINTS, REPORT_ENDPOINTS } from '../../../Api/api.config';
import { ReportSelector } from '../../molecules/Reports/ReportSelector';
import { ReportSummary } from '../../molecules/Reports/ReportSummary';
import { ReportViewer } from '../../organisms/Reports/ReportViewer';
import { ReportTable } from '../../organisms/Reports/ReportTable';
import { ReportActions } from '../../organisms/Reports/ReportActions';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

const REPORT_CONFIGS = {
  noDevueltos: {
    value:       'noDevueltos',
    label:       'Materiales No Devueltos',
    title:       'Reporte Ejecutivo: Materiales No Devueltos',
    description: 'Inventario físico despachado en calidad de préstamo que aún no ha reingresado a los almacenes. Facilita la toma de decisiones para iniciar procesos de recuperación de activos y mantener un control estricto sobre el patrimonio institucional.',
    conclusion:  'Se recomienda emitir recordatorios inmediatos a las partes involucradas. La recuperación oportuna es crítica para garantizar la disponibilidad operativa y minimizar costos de reposición.',
    fileName:    'reporte_materiales_no_devueltos',
    endpoint:    STATS_ENDPOINTS.unreturnedMaterials,
    columns:     [{ key: 'name', label: 'Material' }, { key: 'cantidad', label: 'Cantidad pendiente' }],
    summaries:   (data) => [
      { label: 'Materiales distintos', valor: data.length, color: 'danger' },
      { label: 'Unidades sin devolver', valor: data.reduce((a, r) => a + (r.cantidad || 0), 0), color: 'warning' },
    ],
  },
  daniados: {
    value:       'daniados',
    label:       'Materiales Dañados',
    title:       'Reporte Ejecutivo: Materiales Dañados',
    description: 'Consolidación de materiales y equipos reportados con avería, desgaste severo o daño total. Permite identificar patrones de mal uso y planificar presupuestos para mantenimiento o nuevas adquisiciones.',
    conclusion:  'Se sugiere clasificar los ítems entre los que pueden repararse con mantenimiento correctivo y los que deben darse de baja definitivamente del inventario.',
    fileName:    'reporte_materiales_danados',
    endpoint:    STATS_ENDPOINTS.damagedMaterials,
    columns:     [{ key: 'name', label: 'Material' }, { key: 'valor', label: 'Unidades dañadas' }],
    summaries:   (data) => [
      { label: 'Tipos de material', valor: data.length, color: 'danger' },
      { label: 'Total unidades dañadas', valor: data.reduce((a, r) => a + (r.valor || 0), 0), color: 'warning' },
    ],
  },
  morosos: {
    value:       'morosos',
    label:       'Usuarios Morosos',
    title:       'Reporte Ejecutivo: Usuarios en Estado de Morosidad',
    description: 'Usuarios que han excedido los tiempos límite de la política de préstamos. Identificar estos retrasos es vital para aplicar las medidas disciplinarias o bloqueos temporales estipulados en el reglamento.',
    conclusion:  'Aplicar las restricciones correspondientes hasta que los usuarios regularicen su situación. Se sugiere automatizar alertas de vencimiento para reducir la tasa de morosidad.',
    fileName:    'reporte_usuarios_morosos',
    endpoint:    STATS_ENDPOINTS.defaultingUsers,
    columns:     [{ key: 'name', label: 'Usuario' }, { key: 'pendientes', label: 'Préstamos retrasados' }],
    summaries:   (data) => [
      { label: 'Usuarios morosos', valor: data.length, color: 'danger' },
      { label: 'Total préstamos vencidos', valor: data.reduce((a, r) => a + (r.pendientes || 0), 0), color: 'warning' },
    ],
  },
  masPrestados: {
    value:       'masPrestados',
    label:       'Materiales Más Prestados',
    title:       'Reporte Ejecutivo: Rotación y Demanda de Materiales',
    description: 'Clasificación de materiales según su frecuencia de uso. Comprender la rotación brinda ventaja estratégica para optimizar el stock y garantizar que no haya desabastecimiento de insumos críticos.',
    conclusion:  'Se recomienda evaluar un incremento en el stock de seguridad de los ítems con mayor rotación o renegociar contratos de suministro para obtener mejores márgenes por volumen.',
    fileName:    'reporte_materiales_mas_prestados',
    endpoint:    STATS_ENDPOINTS.mostUsedMaterials,
    columns:     [{ key: 'name', label: 'Material' }, { key: 'prestamos', label: 'Total de préstamos' }],
    summaries:   (data) => [
      { label: 'Materiales analizados', valor: data.length, color: 'primary' },
      { label: 'Total préstamos', valor: data.reduce((a, r) => a + (r.prestamos || 0), 0), color: 'success' },
    ],
  },
  inventario: {
    value:       'inventario',
    label:       'Inventario Actual',
    title:       'Reporte Ejecutivo: Estado del Inventario',
    description: 'Estado actual de todos los materiales registrados en el sistema, incluyendo cantidad disponible, estado y ubicación por bodega y área.',
    conclusion:  'Revisar los materiales con estado diferente a "disponible" para garantizar la continuidad operativa. Se recomienda actualizar el stock de materiales críticos.',
    fileName:    'reporte_inventario_actual',
    endpoint:    REPORT_ENDPOINTS.inventario,
    requiresAuth: true,
    columns:     [{ key: 'nombre', label: 'Material' }, { key: 'codigo', label: 'Código' }, { key: 'cantidad', label: 'Cantidad' }, { key: 'estado', label: 'Estado' }, { key: 'bodega', label: 'Bodega' }, { key: 'area', label: 'Área' }],
    summaries:   (data) => [
      { label: 'Tipos de material', valor: data.length, color: 'primary' },
      { label: 'Total unidades', valor: data.reduce((a, r) => a + (r.cantidad || 0), 0), color: 'success' },
    ],
  },
};

export default function Reportes() {
  const [selectedKey, setSelectedKey] = useState('');
  const [data, setData]               = useState([]);
  const [isLoading, setIsLoading]     = useState(false);
  const [error, setError]             = useState(null);

  const options       = Object.values(REPORT_CONFIGS).map(c => ({ value: c.value, label: c.label }));
  const config        = selectedKey ? REPORT_CONFIGS[selectedKey] : null;
  const summaryCards  = config && data.length > 0 ? config.summaries(data) : [];

  useEffect(() => {
    if (!config) { setData([]); return; }
    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axiosClient.get(config.endpoint);
        setData(res.data || []);
      } catch {
        setError('No se pudieron cargar los datos del reporte.');
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [selectedKey]);

  return (
    <div>
      <h1 className="fw-bold mb-1">Gestión de Reportes</h1>
      <p className="text-muted mb-4 small">
        Selecciona un reporte para visualizar los datos y descargar el documento PDF.
      </p>

      <div className="card shadow-sm border-0 rounded-4 mb-4">
        <div className="card-body p-4">
          <ReportSelector options={options} selectedValue={selectedKey} onChange={setSelectedKey} />
        </div>
      </div>

      {config && (
        <ReportViewer icon={faFileAlt} iconColor="primary" title={config.title} subtitle={config.description}>

          {summaryCards.length > 0 && (
            <div className="d-flex gap-3 flex-wrap mb-4">
              {summaryCards.map((s, i) => (
                <ReportSummary key={i} label={s.label} valor={s.valor} color={s.color} />
              ))}
            </div>
          )}

          <ReportTable columns={config.columns} data={data} isLoading={isLoading} error={error} />

          <ReportActions reportConfig={config} data={data} disabled={isLoading || !!error} />

        </ReportViewer>
      )}
    </div>
  );
}
