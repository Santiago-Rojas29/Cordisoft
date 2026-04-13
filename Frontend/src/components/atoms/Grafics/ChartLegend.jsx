import PropTypes from 'prop-types';

export const ChartLegend = ({ fill, value }) => {
  return (
    <div className="d-flex align-items-center me-3 mb-2">
      <div className="rounded-circle me-2 shadow-sm" style={{ width: '12px', height: '12px', backgroundColor: fill }}></div>
      <span className="text-secondary small fw-medium">{value}</span>
    </div>
  );
};

ChartLegend.propTypes = {
  fill: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};