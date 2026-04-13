import PropTypes from 'prop-types';

export const StatsDashboardTemplate = ({ children }) => {
  return (
    <div className="container-fluid py-4 px-0">
      <div className="row row-cols-1 row-cols-lg-2 g-4">
        {children}
      </div>
    </div>
  );
};

StatsDashboardTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
