import PropTypes from 'prop-types';

export const ReportSummary = ({ label, valor, color }) => (
  <div className="card border-0 shadow-sm rounded-3 px-4 py-3 text-center">
    <div className={`fs-2 fw-bold text-${color}`}>{valor}</div>
    <div className="text-muted small">{label}</div>
  </div>
);

ReportSummary.propTypes = {
  label: PropTypes.string.isRequired,
  valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};
