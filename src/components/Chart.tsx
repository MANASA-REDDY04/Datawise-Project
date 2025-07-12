import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';
import './Chart.css';
import { useEffect, useState } from 'react';

const data = [
  { name: 'January', uv: 400 },
  { name: 'February', uv: 300 },
  { name: 'March', uv: 500 },
  { name: 'April', uv: 450 },
  { name: 'May', uv: 600 },
];

function Chart() {
  const [colors, setColors] = useState({
    text: getComputedStyle(document.body).getPropertyValue('--text').trim(),
    grid: getComputedStyle(document.body).getPropertyValue('--border').trim(),
  });

  useEffect(() => {
    const updateColors = () => {
      const style = getComputedStyle(document.body);
      setColors({
        text: style.getPropertyValue('--text').trim(),
        grid: style.getPropertyValue('--border').trim(),
      });
    };

    updateColors(); // initial

    // Observe theme class changes
    const observer = new MutationObserver(updateColors);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="chart-container">
      <h2 className="chart-title" style={{ color: colors.text }}>
        Monthly User Visits
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: colors.text }}
            axisLine={{ stroke: colors.text }}
            tickLine={{ stroke: colors.text }}
          >
            <Label
              value="Months"
              offset={-50}
              position="insideBottom"
              fill={colors.text}
              style={{ textAnchor: 'middle' }}
            />
          </XAxis>
          <YAxis
            domain={[0, 'dataMax + 100']}
            tick={{ fontSize: 12, fill: colors.text }}
            axisLine={{ stroke: colors.text }}
            tickLine={{ stroke: colors.text }}
          >
            <Label
              value="Visits"
              angle={-90}
              position="insideLeft"
              fill={colors.text}
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card-background)',
              color: colors.text,
              borderColor: colors.grid,
            }}
          />
          <Legend wrapperStyle={{ color: colors.text }} />
          <Bar dataKey="uv" fill="#6b5b95" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
