export const ReportSelector = ({ options, selectedValue, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="reportType" className="form-label fw-bold">
        Tipo de Reporte
      </label>
      <select
        id="reportType"
        className="form-select shadow-sm"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>Selecciona un reporte...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
