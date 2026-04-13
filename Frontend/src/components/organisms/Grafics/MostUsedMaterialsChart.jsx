import { useState, useEffect } from 'react';
import axios from 'axios';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { STATS_ENDPOINTS } from '../../../api/api.config';
import { StatCard } from '../../molecules/Grafics/StatCard';
import { LoadingSpinner } from '../../atoms/Grafics/LoadingSpinner';
import { CustomTooltip } from '../../molecules/Grafics/CustomTooltip';

export const MostUsedMaterialsChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(STATS_ENDPOINTS.mostUsedMaterials);
        setData(response.data || []);
      } catch (err) {
        setError('No se pudieron cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  let mostUsed = 'N/A';
  if (data.length > 0) {
    const topMaterial = data.reduce((prev, current) => 
      ((prev.prestamos || 0) > (current.prestamos || 0)) ? prev : current
    );
    mostUsed = topMaterial.name;
  }

  return (
    <StatCard
      title="Materiales Más Prestados"
      subtitle="Tendencia de uso a lo largo del tiempo"
      iconName={faChartLine}
      iconColor="#198754"
      badgeValue={`Top: ${mostUsed}`}
      badgeColor="bg-success"
    >
      {isLoading && <LoadingSpinner />}
      {error && <div className="alert alert-danger m-auto">{error}</div>}
      {!isLoading && !error && data.length === 0 && (
        <div className="alert alert-info m-auto">Sin datos disponibles</div>
      )}
      {!isLoading && !error && data.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrestamos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#198754" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#28a745" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip unit="préstamos" />} />
            <Area 
              type="monotone" 
              dataKey="prestamos" 
              stroke="#198754" 
              fillOpacity={1} 
              fill="url(#colorPrestamos)" 
              isAnimationActive={false} 
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </StatCard>
  );
};
