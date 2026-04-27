import { useRef } from 'react';
import { StatsDashboardTemplate } from '../../templates/Grafics/StatsDashboardTemplate';
import { UnreturnedMaterialsChart } from '../../organisms/Grafics/UnreturnedMaterialsChart';
import { DefaultingUsersChart } from '../../organisms/Grafics/DefaultingUsersChart';
import { MostUsedMaterialsChart } from '../../organisms/Grafics/MostUsedMaterialsChart';
import { StockByWarehouseChart } from '../../organisms/Grafics/StockByWarehouseChart';
import { ReturnRateChart } from '../../organisms/Grafics/ReturnRateChart';

export default function Dashboard() {
  const unreturnedRef     = useRef();
  const defaultingRef     = useRef();
  const mostUsedRef       = useRef();
  const stockWarehouseRef = useRef();
  const returnRateRef     = useRef();

  return (
    <div>
      <h1 className="fw-bold mb-4">Panel de Administración</h1>
      <StatsDashboardTemplate>
        <div className="col" ref={unreturnedRef}>
          <UnreturnedMaterialsChart />
        </div>
        <div className="col" ref={defaultingRef}>
          <DefaultingUsersChart />
        </div>
        <div className="col" ref={mostUsedRef}>
          <MostUsedMaterialsChart />
        </div>
        <div className="col" ref={stockWarehouseRef}>
          <StockByWarehouseChart />
        </div>
        <div className="col" ref={returnRateRef}>
          <ReturnRateChart />
        </div>
      </StatsDashboardTemplate>
    </div>
  );
}
