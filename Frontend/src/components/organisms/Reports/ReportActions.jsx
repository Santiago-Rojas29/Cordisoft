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
          <button className="btn btn-success px-4 fw-medium shadow-sm" disabled={loading}>
            <i className="bi bi-file-earmark-pdf me-2"></i>
            {loading ? "Generando documento..." : "Descargar Reporte PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};