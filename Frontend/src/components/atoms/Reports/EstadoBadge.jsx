import PropTypes from 'prop-types';

const COLORES = {
  devuelto: 'bg-success',
  activo:   'bg-warning text-dark',
  vencido:  'bg-danger',
  disponible: 'bg-success',
  dañado:   'bg-danger',
  prestado: 'bg-warning text-dark',
};

export const EstadoBadge = ({ estado }) => (
  <span className={`badge ${COLORES[estado] ?? 'bg-secondary'}`}>
    {estado ?? '—'}
  </span>
);

EstadoBadge.propTypes = {
  estado: PropTypes.string,
};
