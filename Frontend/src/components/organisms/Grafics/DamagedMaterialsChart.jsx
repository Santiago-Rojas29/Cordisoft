import { useState, useEffect } from 'react';
import axios from 'axios';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { STATS_ENDPOINTS } from '../../../Api/api.config';
import { StatCard } from '../../molecules/Grafics/StatCard';
import { LoadingSpinner } from '../../atoms/Grafics/LoadingSpinner';
import { CustomTooltip } from '../../molecules/Grafics/CustomTooltip';

const COLORS = ['#6f42c1', '#8a5cd0', '#a47de0', '#bf9eef'];

export const DamagedMaterialsChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(STATS_ENDPOINTS.damagedMaterials);
        setData(response.data || []);
        console.log(data)
      } catch (err) {
        setError('No se pudieron cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const total = data.reduce((acc, curr) => acc + (curr.valor || 0), 0);

  return (
    <StatCard
      title="Materiales Más Dañados"
      subtitle="Distribución de materiales estropeados"
      iconName={faTools}
      iconColor="#6f42c1"
      badgeValue={`Total: ${total}`}
      badgeColor="bg-primary bg-gradient"
      style={{ '--bs-bg-opacity': .8, backgroundColor: '#6f42c1' }}
    >
      {isLoading && <LoadingSpinner />}
      {error && <div className="alert alert-danger m-auto">{error}</div>}
      {!isLoading && !error && data.length === 0 && (
        <div className="alert alert-info m-auto">Sin datos disponibles</div>
      )}
      {!isLoading && !error && data.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="valor"
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip unit="unidades" />} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </StatCard>
  );
};
