export const ReportTable = ({ columns, data, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2 text-muted">Cargando datos del reporte...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger shadow-sm" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="alert alert-info shadow-sm" role="alert">
        <i className="bi bi-info-circle-fill me-2"></i>
        No hay datos disponibles para este reporte en este momento.
      </div>
    );
  }

  return (
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-hover table-bordered mb-0">
        <thead className="table-light">
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col.key] != null ? String(row[col.key]) : 'N/A'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};