import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getWeeklyCalories } from '../../services/analytics/analytics-service';

function WeeklyCaloriesBurned() {
  const [calories, setCalories] = useState([]);

  useEffect(() => {
    async function fetchWeight() {
      const data = await getWeeklyCalories();
      setCalories(data.data.analytics);
    }
    fetchWeight();
  }, []);

  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={calories}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='label' />
        <YAxis />
        <Tooltip />
        <Bar dataKey='value' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default WeeklyCaloriesBurned;
