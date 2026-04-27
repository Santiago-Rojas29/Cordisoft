import { useState, useEffect } from 'react';
import axios from 'axios';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, DotProps } from 'recharts';
import { STATS_ENDPOINTS } from '../../../Api/api.config';
import { StatCard } from '../../molecules/Grafics/StatCard';
import { LoadingSpinner } from '../../atoms/Grafics/LoadingSpinner';
import { CustomTooltip } from '../../molecules/Grafics/CustomTooltip';

const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

export const MostUsedMaterialsChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(STATS_ENDPOINTS.loansByMonth);
        const formatted = (response.data || []).map(item => ({
          ...item,
          name: MESES[(item.mes || 1) - 1],
        }));
        setData(formatted);
      } catch {
        setError('No se pudieron cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const total = data.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const año = new Date().getFullYear();

  return (
    <StatCard
      title="Préstamos por Mes"
      subtitle={`Tendencia de préstamos durante ${año}`}
      iconName={faChartLine}
      iconColor="#198754"
      badgeValue={`Total año: ${total}`}
      badgeColor="bg-success"
    >
      {isLoading && <LoadingSpinner />}
      {error && <div className="alert alert-danger m-auto">{error}</div>}
      {!isLoading && !error && data.length === 0 && (
        <div className="alert alert-info m-auto">Sin datos disponibles</div>
      )}
      {!isLoading && !error && data.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip content={<CustomTooltip unit="préstamos" />} />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#198754"
              strokeWidth={2.5}
              dot={{ r: 5, fill: '#198754' }}
              activeDot={{ r: 7 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </StatCard>
  );
};
