import { useEffect, useState } from 'react';
import { getWeeklyDuration } from '../../services/analytics/analytics-service';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function AverageWeeklyDuration() {
  const [duration, setDuration] = useState([]);

  useEffect(() => {
    async function fetchDuration() {
      const data = await getWeeklyDuration();
      setDuration(data.data.analytics);
    }
    fetchDuration();
  }, []);

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={duration}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='label' />
        <YAxis />
        <Tooltip />
        <Bar dataKey='value' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AverageWeeklyDuration;
