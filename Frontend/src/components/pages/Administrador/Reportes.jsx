import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faExclamationTriangle, faBoxes } from '@fortawesome/free-solid-svg-icons';
import { ReportViewer } from '../../organisms/Reports/ReportViewer';
import { ReportePrestamos } from '../../organisms/Reports/ReportePrestamos';
import { ReporteDanos } from '../../organisms/Reports/ReporteDanos';
import { ReporteInventario } from '../../organisms/Reports/ReporteInventario';

const TABS = [
  { key: 'prestamos',  label: 'Préstamos', icon: faFileAlt,            iconColor: 'primary',  subtitle: 'Historial de préstamos por período' },
  { key: 'danos',      label: 'Daños',     icon: faExclamationTriangle, iconColor: 'danger',   subtitle: 'Materiales reportados como dañados' },
  { key: 'inventario', label: 'Inventario',icon: faBoxes,              iconColor: 'success',  subtitle: 'Estado actual de todos los materiales' },
];

export default function Reportes() {
  const [tab, setTab] = useState('prestamos');
  const tabActual = TABS.find(t => t.key === tab);

  return (
    <div>
      <h1 className="fw-bold mb-4">Gestión de Reportes</h1>

      <ul className="nav nav-tabs mb-4">
        {TABS.map(t => (
          <li className="nav-item" key={t.key}>
            <button
              className={`nav-link d-flex align-items-center gap-2 ${tab === t.key ? 'active fw-semibold' : ''}`}
              onClick={() => setTab(t.key)}
            >
              <FontAwesomeIcon icon={t.icon} />
              {t.label}
            </button>
          </li>
        ))}
      </ul>

      <ReportViewer
        icon={tabActual.icon}
        iconColor={tabActual.iconColor}
        title={tabActual.label}
        subtitle={tabActual.subtitle}
      >
        {tab === 'prestamos'  && <ReportePrestamos />}
        {tab === 'danos'      && <ReporteDanos />}
        {tab === 'inventario' && <ReporteInventario />}
      </ReportViewer>
    </div>
  );
}
