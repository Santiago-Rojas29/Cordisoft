import { StatsDashboardTemplate } from '../../templates/Grafics/StatsDashboardTemplate';
import { UnreturnedMaterialsChart } from '../../organisms/Grafics/UnreturnedMaterialsChart';
import { DamagedMaterialsChart } from '../../organisms/Grafics/DamagedMaterialsChart';
import { DefaultingUsersChart } from '../../organisms/Grafics/DefaultingUsersChart';
import { MostUsedMaterialsChart } from '../../organisms/Grafics/MostUsedMaterialsChart';
import { useRef } from 'react';
import { ExportDashboardPDF } from '../../organisms/PDF/ExportDashboardPDF';

export default function Dashboard() {

  const unreturnedRef = useRef();
  const damagedRef = useRef();
  const defaultingRef = useRef();
  const mostUsedRef = useRef();

  const charts = [
    { id: 'unreturned', name: 'Materiales No Devueltos', ref: unreturnedRef },
    { id: 'damaged', name: 'Materiales Más Dañados', ref: damagedRef },
    { id: 'defaulting', name: 'Usuarios Morosos', ref: defaultingRef },
    { id: 'mostUsed', name: 'Materiales Más Utilizados', ref: mostUsedRef }
  ];

  return (
    <div>
      <h1 className="fw-bold mb-4">
        Panel de Administración
      </h1>

      <ExportDashboardPDF charts={charts} />

      <div>
        <StatsDashboardTemplate>
          <div className="col" ref={unreturnedRef}>
            <UnreturnedMaterialsChart />
          </div>
          <div className="col" ref={damagedRef}>
            <DamagedMaterialsChart />
          </div>
          <div className="col" ref={defaultingRef}>
            <DefaultingUsersChart />
          </div>
          <div className="col" ref={mostUsedRef}>
            <MostUsedMaterialsChart />
          </div>
        </StatsDashboardTemplate>
      </div>
    </div>
  );
}
