import PropTypes from 'prop-types';
import { TableCell } from '../../atoms/Reports/TableCell';

export const ReportTableRow = ({ numero, children }) => (
  <tr>
    <TableCell className="text-muted small">{numero}</TableCell>
    {children}
  </tr>
);

ReportTableRow.propTypes = {
  numero:   PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};