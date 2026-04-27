import PropTypes from 'prop-types';
import { ReportTableHeader } from '../../molecules/Reports/ReportTableHeader';

export const ReportTable = ({ columnas, children }) => (
  <div className="table-responsive">
    <table className="table table-hover align-middle">
      <ReportTableHeader columnas={columnas} />
      <tbody>{children}</tbody>
    </table>
  </div>
);

ReportTable.propTypes = {
  columnas: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};