import PropTypes from 'prop-types';
import { LoadingSpinner } from '../../atoms/Grafics/LoadingSpinner';

export const ReportTable = ({ columns, data, isLoading, error }) => {
  if (isLoading) return <LoadingSpinner message="Cargando reporte..." />;

  if (error) return (
    <div className="alert alert-danger shadow-sm" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
    </div>
  );

  if (!data || data.length === 0) return (
    <div className="alert alert-info shadow-sm" role="alert">
      <i className="bi bi-info-circle-fill me-2"></i>
      No hay datos disponibles para este reporte.
    </div>
  );

  return (
    <div className="table-responsive rounded-3 shadow-sm">
      <table className="table table-hover table-bordered mb-0 align-middle">
        <thead style={{ backgroundColor: '#1a1a2e', color: '#fff' }}>
          <tr>
            <th scope="col" style={{ width: 50 }}>#</th>
            {columns.map((col, i) => (
              <th key={i} scope="col">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'table-light' : ''}>
              <td className="text-muted small">{rowIndex + 1}</td>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col.key] != null ? String(row[col.key]) : '—'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReportTable.propTypes = {
  columns:   PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, label: PropTypes.string })).isRequired,
  data:      PropTypes.array,
  isLoading: PropTypes.bool,
  error:     PropTypes.string,
};
