import { useState, useEffect } from 'react';
import axios from 'axios';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { STATS_ENDPOINTS } from '../../../Api/api.config';
import { StatCard } from '../../molecules/Grafics/StatCard';
import { LoadingSpinner } from '../../atoms/Grafics/LoadingSpinner';
import { CustomTooltip } from '../../molecules/Grafics/CustomTooltip';

const COLORS = ['#dc3545', '#e4606d', '#eb8c95', '#f2b8bd'];

export const UnreturnedMaterialsChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(STATS_ENDPOINTS.unreturnedMaterials);
        setData(response.data || []);
      } catch (err) {
        setError('No se pudieron cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const total = data.reduce((acc, curr) => acc + (curr.cantidad || 0), 0);

  return (
    <StatCard
      title="Materiales No Devueltos"
      subtitle="Total de materiales pendientes por devolver"
      iconName={faBoxOpen}
      iconColor="#dc3545"
      badgeValue={`Total: ${total}`}
      badgeColor="bg-danger"
    >
      {isLoading && <LoadingSpinner />}
      {error && <div className="alert alert-danger m-auto">{error}</div>}
      {!isLoading && !error && data.length === 0 && (
        <div className="alert alert-info m-auto">Sin datos disponibles</div>
      )}
      {!isLoading && !error && data.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip content={<CustomTooltip unit="unidades" />} cursor={{fill: 'rgba(0,0,0,0.05)'}}/>
            <Bar dataKey="cantidad" isAnimationActive={false} radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </StatCard>
  );
};
