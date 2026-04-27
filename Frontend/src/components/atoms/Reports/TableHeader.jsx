import PropTypes from 'prop-types';

export const TableHeader = ({ children }) => (
  <th>{children}</th>
);

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
};
