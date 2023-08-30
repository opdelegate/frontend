import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  ComposedChart,
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import { Box, HStack, Text } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';

export const CustomBarsChartWrapper = ({
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
      px={4}
      pt={1}
      pb={4}
      height="inherit"
      background="white"
    >
      <HStack ref={headref} justifyContent="space-between" mb={1} py={2}>
        <Text as="b" fontSize="20px" color="black">
          {label}
        </Text>
      </HStack>

      <Box height={`calc(100% - ${tabsHeight}px)`}>
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </Box>
    </Box>
  );
};

const BarsCustomTooltip = ({ payload, active }: any) => {
  //   console.log(active, payload);
  if (active) {
    return (
      <Box
        background="white"
        boxShadow=" 0px 4px 10px 0px rgba(0, 0, 0, 0.1)"
        borderRadius="5px"
        p={2}
      >
        <HStack justifyContent="space-between">
          <Text color="rgba(0, 0, 0, 0.7)">Quantity</Text>
          <Text as="b">{payload?.[0]?.payload?.quantity}</Text>
        </HStack>
      </Box>
    );
  }

  return null;
};

export const CustomBarsChart = ({
  data,
  label,
}: {
  data: any[];
  label: string;
}) => {
  return (
    <CustomBarsChartWrapper label={label}>
      <BarChart
        data={data}
        layout="vertical"
        margin={
          {
            //   top: 15,
          }
        }
      >
        <defs>
          <linearGradient id={`colorgradient`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FC0D29" stopOpacity={1}></stop>
            <stop offset="100%" stopColor="#9306FC" stopOpacity={1}></stop>
          </linearGradient>
        </defs>
        <Bar
          dataKey="quantity"
          barSize={20}
          fill={`url(#colorgradient)`}
          radius={100}
          background={{ fill: 'rgba(247, 248, 252, 1)', radius: 100 }}
        />
        <XAxis
          dataKey="quantity"
          type="number"
          strokeOpacity={0}
          tick={
            {
              // fill: 'transparent'
              // fontSize: '0',
            }
          }
          height={0}
        />
        <YAxis
          type="category"
          dataKey="label"
          strokeOpacity={0}
          tick={{
            fill: 'black',
            fontWeight: 600,
            fontSize: '12px',
          }}
          tickMargin={10}
          //   width={35}
        />
        <Tooltip
          active
          content={<BarsCustomTooltip />}
          cursor={{ fill: 'transparent' }}
        />
      </BarChart>
    </CustomBarsChartWrapper>
  );
};
