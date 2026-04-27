import PropTypes from 'prop-types';

export const TableCell = ({ children, className = '' }) => (
  <td className={className}>{children}</td>
);

TableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
