import PropTypes from 'prop-types';
import { TableHeader } from '../../atoms/Reports/TableHeader';

export const ReportTableHeader = ({ columnas }) => (
  <thead className="table-light">
    <tr>
      {columnas.map((col, i) => (
        <TableHeader key={i}>{col}</TableHeader>
      ))}
    </tr>
  </thead>
);

ReportTableHeader.propTypes = {
  columnas: PropTypes.arrayOf(PropTypes.string).isRequired,
};