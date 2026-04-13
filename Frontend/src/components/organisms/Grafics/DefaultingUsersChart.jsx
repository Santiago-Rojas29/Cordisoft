import { useState, useEffect } from 'react';
import axios from 'axios';
import { faUserClock } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { STATS_ENDPOINTS } from '../../../api/api.config';
import { StatCard } from '../../molecules/Grafics/StatCard';
import { LoadingSpinner } from '../../atoms/Grafics/LoadingSpinner';
import { CustomTooltip } from '../../molecules/Grafics/CustomTooltip';

const COLORS = ['#0d6efd', '#3d8bfd', '#6ea8fe', '#9ec5fe'];

export const DefaultingUsersChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(STATS_ENDPOINTS.defaultingUsers);
        setData(response.data || []);
      } catch (err) {
        setError('No se pudieron cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const total = data.length;

  return (
    <StatCard
      title="Usuarios Morosos"
      subtitle="Usuarios con materiales sin devolver"
      iconName={faUserClock}
      iconColor="#0d6efd"
      badgeValue={`Total: ${total}`}
      badgeColor="bg-primary"
    >
      {isLoading && <LoadingSpinner />}
      {error && <div className="alert alert-danger m-auto">{error}</div>}
      {!isLoading && !error && data.length === 0 && (
        <div className="alert alert-info m-auto">Sin datos disponibles</div>
      )}
      {!isLoading && !error && data.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip unit="pendientes" />} cursor={{fill: 'rgba(0,0,0,0.05)'}}/>
            <Bar dataKey="pendientes" isAnimationActive={false} radius={[4, 4, 0, 0]}>
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
