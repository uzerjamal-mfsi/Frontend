import { useEffect, useState } from 'react';
import { getWeightMeasurements } from '../../services/analytics/analytics-service';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function WeightMeasurements() {
  const [weight, setWeight] = useState([]);

  useEffect(() => {
    async function fetchCalories() {
      const data = await getWeightMeasurements();
      setWeight(data.data.analytics);
    }
    fetchCalories();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        width={500}
        height={300}
        data={weight}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeightMeasurements;
