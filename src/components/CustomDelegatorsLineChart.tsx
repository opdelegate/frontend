import {
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { CustomChartTooltip } from './CustomChartTooltip';
import { useMemo, useRef, useState } from 'react';
import { NumDelegators } from '../types/dataTypes';
import { formatDate, formatNumber } from '../utils/functions';
import ChartWrapper from './ChartWrapper';

//TO-DO: I think this chart will need to be deleted if the formatting of the data is done correctly from the backend
export const CustomDelegatorsLineChart = ({
  data,
  themeColor,
}: {
  data: NumDelegators[];
  themeColor: string;
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const filteredAndFormattedData = useMemo(() => {
    const daysToSlice = selectedTab === 0 ? 7 : selectedTab === 1 ? 30 : 365;

    const today = new Date();
    const filteredData = data.filter((d) => {
      const date = new Date(d.day);
      // Ensuring both values are dates and performing the subtraction.
      return (
        (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24) <=
        daysToSlice
      );
    });

    const config: Intl.DateTimeFormatOptions = {
      weekday: selectedTab === 0 ? 'short' : undefined,
      year: undefined,
      month: [1, 2].includes(selectedTab) ? 'short' : undefined,
      day: selectedTab === 0 ? undefined : 'numeric',
    };

    return filteredData.map((d) => ({
      label: formatDate(d.day, config),
      quantity: d.count,
      date: formatDate(d.day),
    }));
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
