
import React from 'react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart';
import { BarChart as RechartsBarChart, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  yAxisWidth?: number;
  showAnimation?: boolean;
}

export function BarChart({ 
  data, 
  index, 
  categories, 
  colors = ['blue'], 
  yAxisWidth = 30,
  showAnimation = false
}: BarChartProps) {
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
      <RechartsBarChart data={data}>
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
        <Tooltip 
          content={<ChartTooltipContent />} 
          cursor={{ fill: 'transparent' }}
        />
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={`var(--color-${colors[i % colors.length]})`}
            radius={[4, 4, 0, 0]}
            isAnimationActive={showAnimation}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}
