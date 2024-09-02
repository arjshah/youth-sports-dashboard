'use client'

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface ChartProps {
  data: Array<{ [key: string]: string | number }>;
  xKey: string;
  yKey: string;
  fill?: string;
}

const Chart: React.FC<ChartProps> = ({ data, xKey, yKey, fill = "#3b82f6" }) => (
  <ResponsiveContainer width="100%" height={350}>
    <BarChart data={data}>
      <XAxis dataKey={xKey} />
      <YAxis />
      <Bar dataKey={yKey} fill={fill} />
    </BarChart>
  </ResponsiveContainer>
);

export default Chart;