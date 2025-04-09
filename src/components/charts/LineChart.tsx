
import React from 'react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  yAxisWidth?: number;
  showAnimation?: boolean;
}

export function LineChart({ 
  data, 
  index, 
  categories, 
  colors = ['blue'], 
  yAxisWidth = 30,
  showAnimation = false
}: LineChartProps) {
  const chartConfig: ChartConfig = {
    blue: { 
      theme: { light: '#2563eb', dark: '#3b82f6' }
    },
    sky: { 
      theme: { light: '#0284c7', dark: '#0ea5e9' }
    },
    indigo: { 
      theme: { light: '#4f46e5', dark: '#6366f1' }
    },
    violet: { 
      theme: { light: '#7c3aed', dark: '#8b5cf6' }
    }
  };

  return (
    <ChartContainer config={chartConfig}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey={index} 
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          width={yAxisWidth}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<ChartTooltipContent />} />
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={`var(--color-${colors[i % colors.length]})`}
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            isAnimationActive={showAnimation}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
}
