import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

export const FiltroDeFechas = ({ desde, hasta, onDesde, onHasta, onBuscar, cargando }) => {
  const hoy = new Date().toISOString().split('T')[0];

  return (
    <div className="d-flex flex-wrap gap-3 align-items-end mb-4">
      <div>
        <label className="form-label small fw-semibold text-muted">Desde</label>
        <input
          type="date"
          className="form-control"
          value={desde}
          max={hasta}
          onChange={e => onDesde(e.target.value)}
        />
      </div>
      <div>
        <label className="form-label small fw-semibold text-muted">Hasta</label>
        <input
          type="date"
          className="form-control"
          value={hasta}
          min={desde}
          max={hoy}
          onChange={e => onHasta(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary d-flex align-items-center gap-2"
        onClick={onBuscar}
        disabled={cargando}
      >
        <FontAwesomeIcon icon={cargando ? faSpinner : faSearch} spin={cargando} />
        Buscar
      </button>
    </div>
  );
};

FiltroDeFechas.propTypes = {
  desde:    PropTypes.string.isRequired,
  hasta:    PropTypes.string.isRequired,
  onDesde:  PropTypes.func.isRequired,
  onHasta:  PropTypes.func.isRequired,
  onBuscar: PropTypes.func.isRequired,
  cargando: PropTypes.bool,
};
