import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ComposedChart,
} from 'recharts';
import { CustomChartTooltip } from './CustomChartTooltip';
import { useMemo, useState } from 'react';
import { formatDate, formatNumber } from '../utils/functions';
import { DailyChange } from '../types/dataTypes';
import ChartWrapper from './ChartWrapper';

export const CustomAreaChart = ({
  data,
  label,
  themeColor,
}: {
  data: DailyChange[];
  label: string;
  themeColor: string;
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const filteredAndFormattedData = useMemo(() => {
    const daysToSlice = selectedTab === 0 ? 7 : selectedTab === 1 ? 31 : 365;
    const d = data.slice(-daysToSlice).map((d) => {
      const config: Intl.DateTimeFormatOptions = {
        weekday: selectedTab === 0 ? 'short' : undefined,
        year: undefined,
        month: [1, 2].includes(selectedTab) ? 'short' : undefined,
        day: selectedTab === 0 ? undefined : 'numeric',
      };
      return {
        label: formatDate(d.date, config),
        change: d.change,
        date: formatDate(d.date),
      };
    });
    return d;
  }, [data, selectedTab]);

  const longestLabelLength = useMemo(() => {
    return filteredAndFormattedData
      .map((c) => c.change.toString())
      .reduce((acc, cur) => (cur.length > acc ? cur.length : acc), 0);
  }, [filteredAndFormattedData]);

  return (
    <ChartWrapper setSelectedTab={setSelectedTab}>
      <ComposedChart data={filteredAndFormattedData}>
        <CartesianGrid stroke="#ccc" strokeDasharray="3" vertical={false} />
        <defs>
          <linearGradient id={`color${themeColor}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={themeColor} stopOpacity={0.6}></stop>
            <stop offset="75%" stopColor={themeColor} stopOpacity={0.2}></stop>
            <stop offset="100%" stopColor={themeColor} stopOpacity={0}></stop>
          </linearGradient>
        </defs>
        <Area
          //   type="monotone"
          dataKey="change"
          stroke={themeColor}
          //   stroke={'transparent'}
          fill={`url(#color${themeColor})`}
          strokeWidth={2}
        />
        <XAxis
          //   allowDuplicatedCategory={false}
          dataKey="label"
          tickLine={{ opacity: 0 }}
          tick={{ fill: 'black', fontWeight: 500, fontSize: 12 }}
          axisLine={{ stroke: themeColor }}
          angle={[1, 2].includes(selectedTab) ? -45 : 0}
          height={35}
          tickMargin={15}
        />
        <YAxis
          strokeOpacity={0}
          tick={{ fill: 'black', fontWeight: 500, fontSize: 12 }}
          width={longestLabelLength * 10}
          //   domain={['dataMin - 100', 'dataMax + 100']}
          tickFormatter={(value) => formatNumber(value)}
        />
        <Tooltip active label="pepe" content={<CustomChartTooltip />} />
      </ComposedChart>
    </ChartWrapper>
  );
};
