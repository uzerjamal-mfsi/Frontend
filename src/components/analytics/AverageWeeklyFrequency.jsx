import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getWeeklyFrequency } from '../../services/analytics/analytics-service';

function AverageWeeklyFrequency() {
  const [frequency, setFrequency] = useState([]);

  useEffect(() => {
    async function fetchFrequency() {
      const data = await getWeeklyFrequency();
      setFrequency(data.data.analytics);
    }
    fetchFrequency();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={frequency}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AverageWeeklyFrequency;
