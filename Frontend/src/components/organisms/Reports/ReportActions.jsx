import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

export const exportarTXT = (datos, titulo) => {
  const headers = Object.keys(datos[0] ?? {}).join('\t');
  const rows = datos.map(row => Object.values(row).map(v => String(v ?? '')).join('\t')).join('\n');
  const blob = new Blob([`${titulo}\n\n${headers}\n${rows}`], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${titulo.replace(/ /g, '_')}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

export const ReportActions = ({ onExportar }) => (
  <div className="d-flex justify-content-end mb-3">
    <button
      className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
      onClick={onExportar}
    >
      <FontAwesomeIcon icon={faFilePdf} />
      Exportar
    </button>
  </div>
);

ReportActions.propTypes = {
  onExportar: PropTypes.func.isRequired,
};