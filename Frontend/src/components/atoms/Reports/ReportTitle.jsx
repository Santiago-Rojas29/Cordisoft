import PropTypes from 'prop-types';

export const ReportTitle = ({ title, subtitle }) => (
  <div>
    <h5 className="fw-bold mb-0">{title}</h5>
    {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
  </div>
);

ReportTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
