import { HStack, Box, Text } from '@chakra-ui/react';
import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import useWindowSize from '../hooks/useWindowSize';
import { useMemo } from 'react';
import { DelegatorAmount } from '../types/dataTypes';
import { formatAddress, formatNumber } from '../utils/functions';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#A855F7',
  '#EC4899',
  'red',
  'gray',
  'black',
  'brown',
  '#35edcd',
];

const CustomTooltip = ({ payload }: { payload?: any }) => {
  console.log(payload);
  return (
    <Box background="white" p={3} borderRadius={10}>
      <Text>Delegator: {payload?.[0]?.payload?.delegator}</Text>
      <Text>
        Delegated:{' '}
        <b>
          {formatNumber(Math.round(payload?.[0]?.payload?.delegated ?? 0))} OP
        </b>
      </Text>
    </Box>
  );
};

const CustomLegend = ({
  payload,
  fontSize,
}: {
  payload?: any;
  fontSize: number;
}) => {
  //   console.log(props);
  return (
    <>
      {payload.map((entry: any, index: number) => (
        <Box key={`item-${index}`}>
          <HStack>
            <Box
              backgroundColor={entry.payload.fill}
              width="10px"
              height="10px"
              borderRadius={50}
            />
            <Text fontSize={fontSize}>{entry.payload.delegator}</Text>
          </HStack>
          {/* <div style={{ marginLeft: '20px' }}>{entry.payload.value}</div> */}
        </Box>
      ))}
    </>
  );
};

const CustomPieChart = ({
  totalDelegated,
  data,
  label,
}: {
  totalDelegated: number;
  data: DelegatorAmount[];
  label: string;
}) => {
  const windowsSize = useWindowSize();

  //   const isScreenWidthMedium = useMemo((): boolean => {
  //     return windowsSize.width >= 738;
  //   }, [innerWidth]);

  const isScreenWidthLarge = useMemo((): boolean => {
    return windowsSize.width >= 992;
  }, [innerWidth]);

  //   const isScreenWidthExtraLarge = useMemo((): boolean => {
  //     return windowsSize.width >= 1200;
  //   }, [innerWidth]);

  const mappedData = useMemo(() => {
    const top10Delegated = data.reduce((prev, curr) => prev + curr.amount, 0);
    const m = data.map((d) => ({
      delegator: d.ensName ?? formatAddress(d.delegator),
      delegatedPercentage: d.amount / totalDelegated,
      delegated: d.amount,
    }));

    m.push({
      delegator: 'Others',
      delegatedPercentage: (totalDelegated - top10Delegated) / totalDelegated,
      delegated: totalDelegated - top10Delegated,
    });

    return m;
  }, [data, totalDelegated]);

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
      <HStack justifyContent="space-between" mb={1} py={2}>
        <Text as="b" fontSize="20px" color="black">
          {label}
        </Text>
      </HStack>

      <Box height={`calc(100% - 46px)`}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={mappedData}
              dataKey="delegatedPercentage"
              innerRadius={isScreenWidthLarge ? 70 : 60}
              outerRadius={isScreenWidthLarge ? 100 : 90}
            >
              {mappedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
              <Label
                position="centerBottom"
                color="red"
                fontSize={isScreenWidthLarge ? 22 : 16}
              >
                Total Value
              </Label>
              <Label
                position="centerTop"
                fontSize={isScreenWidthLarge ? 22 : 16}
                fontWeight={600}
                capHeight={22}
                fill="black"
              >
                {formatNumber(totalDelegated)}
                {/* {totalDelegated.toLocaleString()} */}
              </Label>
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              //   margin={{ right: 20 }}
              content={<CustomLegend fontSize={isScreenWidthLarge ? 15 : 12} />}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default CustomPieChart;
