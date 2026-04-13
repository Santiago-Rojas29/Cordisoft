import PropTypes from 'prop-types';
import { StatIcon } from '../../atoms/Grafics/StatIcon';
import { BadgeValue } from '../../atoms/Grafics/BadgeValue';

export const StatCard = ({ title, subtitle, iconName, iconColor, badgeValue, badgeColor, children }) => {
  return (
    <div className="card shadow border-0 h-100 rounded-4 overflow-hidden bg-white">
      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-start mb-3 gap-3">
          <div>
            <h5 className="card-title fw-bold text-dark mb-1">{title}</h5>
            {subtitle && <p className="card-text text-muted small">{subtitle}</p>}
          </div>
          <StatIcon iconName={iconName} iconColor={iconColor} />
        </div>
        
        <div className="mb-4">
          <BadgeValue value={badgeValue} colorClass={badgeColor} />
        </div>

        <div className="flex-grow-1 w-100 d-flex flex-column" style={{ minHeight: '300px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  iconName: PropTypes.object.isRequired,
  iconColor: PropTypes.string.isRequired,
  badgeValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  badgeColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};
