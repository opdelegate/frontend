import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { CustomChartTooltip } from './CustomChartTooltip';
import { Box, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useMemo, useRef, useState } from 'react';
import { OPDELEGATES_RED } from '../themes';
import { OPDelegated } from '../types/dataTypes';
import { formatDate, formatNumber } from '../utils/functions';
import ChartWrapper from './ChartWrapper';

export const CustomLineChart = ({
  data,
  themeColor,
}: {
  data: OPDelegated[];
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
        label: formatDate(d.evt_block_time, config),
        quantity: d.newBalance,
        date: formatDate(d.evt_block_time),
      };
    });
    return d;
  }, [data, selectedTab]);

  const longestLabelLength = useMemo(() => {
    return filteredAndFormattedData
      .map((c) => c.quantity.toString())
      .reduce((acc, cur) => (cur.length > acc ? cur.length : acc), 0);
  }, [filteredAndFormattedData]);

  return (
    <ChartWrapper setSelectedTab={setSelectedTab}>
      <LineChart data={filteredAndFormattedData}>
        <CartesianGrid stroke="#ccc" strokeDasharray="3" vertical={false} />
        <Line
          type="monotone"
          dataKey="quantity"
          stroke={themeColor}
          strokeWidth={2}
        />
        <XAxis
          //   allowDuplicatedCategory={false}
          dataKey="label"
          tickLine={{ opacity: 0 }}
          tick={{ fill: 'black', fontWeight: 500, fontSize: 12 }}
          axisLine={{ stroke: themeColor }}
          tickMargin={15}
          angle={[1, 2].includes(selectedTab) ? -45 : 0}
          height={35}
        />
        <YAxis
          strokeOpacity={0}
          tick={{ fill: 'black', fontWeight: 500, fontSize: 12 }}
          width={longestLabelLength * 10}
          domain={['dataMin - 100', 'dataMax + 100']}
          tickFormatter={(value) => formatNumber(value)}
        />
        <Tooltip active content={<CustomChartTooltip />} />
      </LineChart>
    </ChartWrapper>
  );
};
