import PropTypes from 'prop-types';

export const LoadingSpinner = ({ message = 'Cargando datos...' }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 p-5 bg-light rounded-3" style={{ minHeight: '300px' }}>
      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted fw-semibold">{message}</p>
    </div>
  );
};

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};
