import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StatIcon = ({ iconName, iconColor }) => {
  return (
    <div 
      className="d-flex align-items-center justify-content-center rounded-circle border shadow-sm flex-shrink-0"
      style={{ width: '48px', height: '48px', borderColor: iconColor, backgroundColor: `${iconColor}15` }}
    >
      <FontAwesomeIcon icon={iconName} style={{ color: iconColor, fontSize: '1.25rem' }} />
    </div>
  );
};

StatIcon.propTypes = {
  iconName: PropTypes.object.isRequired,
  iconColor: PropTypes.string.isRequired,
};
