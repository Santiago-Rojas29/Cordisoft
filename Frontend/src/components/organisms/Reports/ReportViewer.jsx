import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReportTitle } from '../../atoms/Reports/ReportTitle';

export const ReportViewer = ({ icon, iconColor, title, subtitle, children }) => (
  <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
    <div className="d-flex align-items-center gap-3 mb-3">
      <div className={`rounded-3 p-2 bg-${iconColor} bg-opacity-10`}>
        <FontAwesomeIcon icon={icon} className={`text-${iconColor} fs-4`} />
      </div>
      <ReportTitle title={title} subtitle={subtitle} />
    </div>
    {children}
  </div>
);

ReportViewer.propTypes = {
  icon:      PropTypes.object.isRequired,
  iconColor: PropTypes.string.isRequired,
  title:     PropTypes.string.isRequired,
  subtitle:  PropTypes.string,
  children:  PropTypes.node.isRequired,
};