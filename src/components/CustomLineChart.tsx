import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import { Box, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import { OPDELEGATES_RED } from '../themes';

export const CustomLineChartWrapper = ({ children }: { children: any }) => {
  const tabsRef = useRef<HTMLDivElement | null>(null);
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
      background="white"
    >
      <Tabs
        padding={0}
        mb={4}
        ref={tabsRef}
        //   color="red"
      >
        <TabList
        // _selected={{ color: 'black', fontWeight: 700 }}
        >
          <Tab
            _selected={{
              color: OPDELEGATES_RED,
              borderColor: OPDELEGATES_RED,
            }}
            fontWeight={600}
          >
            This Week
          </Tab>
          <Tab
            _selected={{
              color: OPDELEGATES_RED,
              borderColor: OPDELEGATES_RED,
            }}
            fontWeight={600}
          >
            This Month
          </Tab>
          <Tab
            _selected={{
              color: OPDELEGATES_RED,
              borderColor: OPDELEGATES_RED,
            }}
            fontWeight={600}
          >
            This Year
          </Tab>
        </TabList>
      </Tabs>

      <Box height={`calc(100% - ${tabsHeight}px)`}>
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </Box>
    </Box>
  );
};

export const CustomLineChart = ({
  data,
  themeColor,
}: {
  data: any[];
  themeColor: string;
}) => {
  return (
    <CustomLineChartWrapper>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" strokeDasharray="3" vertical={false} />
        <Line
          type="monotone"
          dataKey="quantity"
          stroke={themeColor}
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
      </LineChart>
    </CustomLineChartWrapper>
  );
};
