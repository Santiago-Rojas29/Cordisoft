import PropTypes from 'prop-types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from '../../Pdf';

export const ReportActions = ({ reportConfig, data, disabled }) => {
  if (disabled || !data || data.length === 0) return null;

  return (
    <div className="d-flex justify-content-end mt-4">
      <PDFDownloadLink
        document={
          <Pdf
            title={reportConfig.title}
            description={reportConfig.description}
            conclusion={reportConfig.conclusion}
            data={data}
            columns={reportConfig.columns}
          />
        }
        fileName={`${reportConfig.fileName}.pdf`}
      >
        {({ loading }) => (
          <button className="btn btn-success px-4 fw-medium shadow-sm d-flex align-items-center gap-2" disabled={loading}>
            <i className="bi bi-file-earmark-pdf"></i>
            {loading ? 'Generando PDF...' : 'Descargar Reporte PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

ReportActions.propTypes = {
  reportConfig: PropTypes.object.isRequired,
  data:         PropTypes.array.isRequired,
  disabled:     PropTypes.bool,
};
