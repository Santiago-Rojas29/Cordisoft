import { StatsDashboardTemplate } from '../../templates/Grafics/StatsDashboardTemplate';
import { UnreturnedMaterialsChart } from '../../organisms/Grafics/UnreturnedMaterialsChart';
import { DamagedMaterialsChart } from '../../organisms/Grafics/DamagedMaterialsChart';
import { DefaultingUsersChart } from '../../organisms/Grafics/DefaultingUsersChart';
import { MostUsedMaterialsChart } from '../../organisms/Grafics/MostUsedMaterialsChart';

export default function Dashboard() {
  return (
    <div>
      <h1 className="fw-bold mb-4">
        Panel de Administración
      </h1>

      <StatsDashboardTemplate>
        <div className="col">
          <UnreturnedMaterialsChart />
        </div>
        <div className="col">
          <DamagedMaterialsChart />
        </div>
        <div className="col">
          <DefaultingUsersChart />
        </div>
        <div className="col">
          <MostUsedMaterialsChart />
        </div>
      </StatsDashboardTemplate>
    </div>
  );
}