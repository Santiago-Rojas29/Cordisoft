import { useState, useEffect } from 'react';
import axios from 'axios';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { STATS_ENDPOINTS } from '../../../Api/api.config';
import { StatCard } from '../../molecules/Grafics/StatCard';
import { LoadingSpinner } from '../../atoms/Grafics/LoadingSpinner';

const COLORS = ['#198754', '#ffc107'];

const CustomLabel = ({ cx, cy, percent }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={22} fontWeight="bold" fill="#333">
    {`${(percent * 100).toFixed(0)}%`}
  </text>
);

export const ReturnRateChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(STATS_ENDPOINTS.returnRate);
        const raw = response.data;
        setData([
          { name: 'Devueltos', value: raw.devueltos || 0 },
          { name: 'Activos (en préstamo)', value: raw.activos || 0 },
        ]);
      } catch {
        setError('No se pudieron cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const porcentaje = total > 0 ? Math.round((data[0]?.value / total) * 100) : 0;

  return (
    <StatCard
      title="Tasa de Devolución"
      subtitle="Préstamos devueltos vs. activos actualmente"
      iconName={faCheckCircle}
      iconColor="#198754"
      badgeValue={`${porcentaje}% devueltos`}
      badgeColor="bg-success"
    >
      {isLoading && <LoadingSpinner />}
      {error && <div className="alert alert-danger m-auto">{error}</div>}
      {!isLoading && !error && total === 0 && (
        <div className="alert alert-info m-auto">Sin datos disponibles</div>
      )}
      {!isLoading && !error && total > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              dataKey="value"
              labelLine={false}
              label={<CustomLabel />}
              isAnimationActive={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} préstamos`]} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </StatCard>
  );
};
