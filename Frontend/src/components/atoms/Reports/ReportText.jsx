import PropTypes from 'prop-types';

export const ReportText = ({ children }) => (
  <span className="text-muted small">{children}</span>
);

ReportText.propTypes = {
  children: PropTypes.node.isRequired,
};
