import PropTypes from 'prop-types';

export const BadgeValue = ({ value, colorClass = 'bg-primary' }) => {
  return (
    <span className={`badge ${colorClass} rounded-pill px-3 py-2 fs-6 shadow-sm`}>
      {value}
    </span>
  );
};

BadgeValue.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  colorClass: PropTypes.string,
};
