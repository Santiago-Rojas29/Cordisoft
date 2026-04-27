import { useState, useEffect } from 'react';
import axios from 'axios';
import { STATS_ENDPOINTS } from '../../../api/api.config';
import { ReportSelector } from '../../molecules/Reports/ReportSelector';
import { ReportTable } from '../../organisms/Reports/ReportTable';
import { ReportActions } from '../../organisms/Reports/ReportActions';

const REPORT_CONFIGS = {
  unreturned: {
    value: 'unreturned',
    label: 'Materiales No Devueltos',
    title: 'Reporte Ejecutivo: Materiales No Devueltos',
    description: 'El presente documento expone de manera detallada el inventario físico que ha sido despachado en calidad de préstamo y que, a la fecha de emisión de este reporte, aún no ha reingresado a los almacenes de la institución. La finalidad de esta información es facilitar la toma de decisiones para iniciar procesos de recuperación de activos, enviar notificaciones preventivas y mantener un control estricto sobre el patrimonio institucional.',
    conclusion: 'Se recomienda al área administrativa emitir recordatorios inmediatos a las partes involucradas. La recuperación oportuna de estos materiales es crítica para garantizar su disponibilidad operativa y minimizar los costos asociados a compras de reposición.',
    fileName: 'reporte_ejecutivo_materiales_no_devueltos',
    endpoint: STATS_ENDPOINTS.unreturnedMaterials,
    columns: [
      { key: 'name', label: 'Nombre del Material' },
      { key: 'cantidad', label: 'Cantidad Pendiente de Devolución' }
    ]
  },
  damaged: {
    value: 'damaged',
    label: 'Materiales Dañados',
    title: 'Reporte Ejecutivo: Materiales Dañados o Mermas',
    description: 'Este reporte refleja la consolidación de todos los materiales y equipos que han sido reportados con algún tipo de avería, desgaste severo o daño total. El análisis de esta información permite a la gerencia identificar patrones de mal uso, evaluar la calidad de los proveedores actuales y planificar estratégicamente los presupuestos para mantenimientos o nuevas adquisiciones en el próximo trimestre.',
    conclusion: 'El estado de los activos aquí listados exige una evaluación técnica. Se sugiere clasificar los ítems entre aquellos que pueden ser reparados mediante mantenimiento correctivo y aquellos que deben ser dados de baja definitivamente del sistema contable y de inventario.',
    fileName: 'reporte_ejecutivo_materiales_danados',
    endpoint: STATS_ENDPOINTS.damagedMaterials,
    columns: [
      { key: 'name', label: 'Nombre del Material' },
      { key: 'valor', label: 'Unidades Reportadas con Daños' }
    ]
  },
  defaulting: {
    value: 'defaulting',
    label: 'Usuarios Morosos',
    title: 'Reporte Ejecutivo: Usuarios en Estado de Morosidad',
    description: 'El siguiente informe detalla a los usuarios (internos o externos) que han excedido los tiempos límite establecidos en la política de préstamos de la institución. Identificar estos retrasos es vital para mantener la integridad de nuestros procesos y aplicar, si corresponde, las medidas disciplinarias o bloqueos temporales estipulados en el reglamento de uso de activos.',
    conclusion: 'Es imperativo aplicar las restricciones correspondientes a los usuarios listados en este reporte hasta que regularicen su situación. Se sugiere automatizar el envío de alertas de vencimiento para mitigar la tasa de morosidad en el futuro.',
    fileName: 'reporte_ejecutivo_usuarios_morosos',
    endpoint: STATS_ENDPOINTS.defaultingUsers,
    columns: [
      { key: 'name', label: 'Nombre Completo del Usuario' },
      { key: 'pendientes', label: 'Total de Préstamos Retrasados' }
    ]
  },
  mostUsed: {
    value: 'mostUsed',
    label: 'Materiales Más Prestados',
    title: 'Reporte Ejecutivo: Rotación y Demanda de Materiales',
    description: 'Este documento estadístico clasifica los materiales de acuerdo a su frecuencia de salida y uso operativo. Comprender qué artículos presentan mayor rotación brinda una ventaja estratégica para la optimización del stock, garantizando que nunca haya desabastecimiento de los insumos críticos para la operación diaria de la institución.',
    conclusion: 'Basado en los altos índices de rotación de estos materiales, se recomienda evaluar un incremento en el stock de seguridad de los ítems principales o renegociar contratos de suministro con proveedores para obtener mejores márgenes de costo por volumen.',
    fileName: 'reporte_ejecutivo_rotacion_materiales',
    endpoint: STATS_ENDPOINTS.mostUsedMaterials,
    columns: [
      { key: 'name', label: 'Descripción del Material' },
      { key: 'prestamos', label: 'Frecuencia Total de Préstamos' }
    ]
  }
};

export default function Reportes() {
  const [selectedReportKey, setSelectedReportKey] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const reportOptions = Object.values(REPORT_CONFIGS).map(config => ({
    value: config.value,
    label: config.label
  }));

  const selectedConfig = selectedReportKey ? REPORT_CONFIGS[selectedReportKey] : null;

  useEffect(() => {
    if (!selectedConfig) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(selectedConfig.endpoint);
        setData(response.data || []);
      } catch (err) {
        console.error("Error fetching report data", err);
        setError("No se pudieron cargar los datos del reporte.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedConfig]);

  return (
    <div className="container-fluid py-4">
      <h1 className="fw-bold mb-4">Gestión de Reportes</h1>
      <p className="text-muted mb-4">
        Selecciona un tipo de reporte para visualizar los datos estadísticos y generar un documento PDF estructurado que ayude a la toma de decisiones.
      </p>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <ReportSelector 
            options={reportOptions}
            selectedValue={selectedReportKey}
            onChange={setSelectedReportKey}
          />
        </div>
      </div>

      {selectedConfig && (
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title fw-bold text-dark mb-2">{selectedConfig.title}</h5>
            <p className="card-text text-muted mb-4 small">{selectedConfig.description}</p>
            
            <ReportTable 
              columns={selectedConfig.columns}
              data={data}
              isLoading={isLoading}
              error={error}
            />

            <ReportActions 
              reportConfig={selectedConfig}
              data={data}
              disabled={isLoading || !!error}
            />
          </div>
        </div>
      )}
    </div>
  );
}
