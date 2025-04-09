
import React from 'react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from '@/components/ui/chart';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface PieChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  showAnimation?: boolean;
}

export function PieChart({ 
  data, 
  index, 
  categories, 
  colors = ['blue', 'sky', 'indigo', 'violet'], 
  showAnimation = false
}: PieChartProps) {
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
      <RechartsPieChart>
        <Tooltip content={<ChartTooltipContent />} />
        <Pie
          data={data}
          nameKey={index}
          dataKey={categories[0]}
          cx="50%"
          cy="50%"
          outerRadius={80}
          isAnimationActive={showAnimation}
          label={(entry) => entry.name}
          labelLine={true}
        >
          {data.map((_, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={`var(--color-${colors[index % colors.length]})`} 
            />
          ))}
        </Pie>
        <ChartLegend 
          verticalAlign="bottom"
          content={<ChartLegendContent nameKey={index} />} 
        />
      </RechartsPieChart>
    </ChartContainer>
  );
}
