import PropTypes from 'prop-types';

export const CustomTooltip = ({ active, payload, label, unit = '' }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-lg">
        <p className="fw-bold mb-2 text-dark border-bottom pb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="d-flex align-items-center mb-1">
            <div 
              className="rounded-circle me-2" 
              style={{ width: '10px', height: '10px', backgroundColor: entry.color || entry.fill || entry.payload.fill }}
            />
            <span className="text-secondary small me-2">{entry.name}:</span>
            <span className="fw-bold small">{entry.value} {unit}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
};
