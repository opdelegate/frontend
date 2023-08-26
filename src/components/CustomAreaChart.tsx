import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  ComposedChart,
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import { Box, HStack, Text } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';

export const CustomAreaChartWrapper = ({
  children,
  label,
}: {
  children: any;
  label: string;
}) => {
  const headref = useRef<HTMLDivElement | null>(null);
  const tabsHeight = useMemo(() => {
    // console.log(tabsRef?.current?.clientHeight);
    // return tabsRef?.current?.clientHeight ?? 58;
    return 58;
  }, []);

  return (
    <Box
      boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.1)"
      borderRadius="15px"
      padding={4}
      height="inherit"
	  background='white'
    >
      <HStack ref={headref} justifyContent="space-between" mb={3} py={2}>
        <Text as="b" fontSize="20px" color="black">
          Daily Data
        </Text>
        <Text fontSize="14px" color="rgba(0, 0, 0, 0.6)">
          {label}
        </Text>
      </HStack>

      <Box height={`calc(100% - ${tabsHeight}px)`}>
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </Box>
    </Box>
  );
};

export const CustomAreaChart = ({
  data,
  label,
  themeColor,
}: {
  data: any[];
  label: string;
  themeColor: string;
}) => {
  return (
    <CustomAreaChartWrapper label={label}>
      <ComposedChart data={data}>
        <CartesianGrid stroke="#ccc" strokeDasharray="3" vertical={false} />
        <defs>
          <linearGradient id={`color${themeColor}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={themeColor} stopOpacity={0.6}></stop>
            <stop offset="75%" stopColor={themeColor} stopOpacity={0.2}></stop>
            <stop offset="100%" stopColor={themeColor} stopOpacity={0}></stop>
          </linearGradient>
        </defs>
        {/* <Line
          type="monotone"
          dataKey="quantity"
          stroke={themeColor}
          strokeWidth={2}
        /> */}
        <Area
          //   type="monotone"
          dataKey="quantity"
          stroke={themeColor}
          //   stroke={'transparent'}
          fill={`url(#color${themeColor})`}
          strokeWidth={2}
        />
        <XAxis
          dataKey="month"
          //   allowDuplicatedCategory={false}
          tickLine={{ opacity: 0 }}
          tick={{ fill: 'black', fontWeight: 500 }}
          axisLine={{ stroke: themeColor }}
          tickMargin={15}
        />
        <YAxis
          strokeOpacity={0}
          tick={{ fill: 'black', fontWeight: 500 }}
          tickMargin={15}
          width={35}
        />
        <Tooltip active content={<CustomTooltip />} />
      </ComposedChart>
    </CustomAreaChartWrapper>
  );
};
