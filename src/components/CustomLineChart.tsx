import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { CumulativeOPDelegatedTooltip } from "./CumulativeOPDelegatedTooltip";
import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import { OPDELEGATES_RED } from "../themes";
import { OPDelegatedResponse } from "../types/responsesTypes";
import { formatDate, formatNumber } from "../utils/functions";

export const CustomLineChartWrapper = ({
  children,
  setSelectedTab,
}: {
  children: any;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
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
      px={4}
      pt={1}
      pb={4}
      height="inherit"
      background="white"
    >
      <Tabs
        padding={0}
        mb={4}
        ref={tabsRef}
        onChange={(index) => setSelectedTab(index)}
      >
        <TabList>
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
  data: OPDelegatedResponse[];
  themeColor: string;
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const filteredAndFormattedData = useMemo(() => {
    // console.log(today.getFullYear)
    const daysToSlice = selectedTab === 0 ? 7 : selectedTab === 1 ? 31 : 365;
    const d = data.slice(-daysToSlice).map((d) => {
      const date = new Date(d.evt_block_time);
      const config: Intl.DateTimeFormatOptions = {
        weekday: selectedTab === 0 ? "short" : undefined,
        year: undefined,
        month: selectedTab === 2 ? "numeric" : undefined,
        day: selectedTab === 0 ? undefined : "numeric",
      };
      return {
        label: formatDate(d.evt_block_time, config),
        quantity: d.newBalance,
        date: formatDate(d.evt_block_time),
      };
    });
    // console.log(d);
    return d;
    // { month: 'Feb', date: '08/03/2023', quantity: 10, hour: '6am' },
  }, [data, selectedTab]);

  const longestLabelLength = useMemo(() => {
    return filteredAndFormattedData
      .map((c) => c.quantity.toString())
      .reduce((acc, cur) => (cur.length > acc ? cur.length : acc), 0);
  }, [filteredAndFormattedData]);

  return (
    <CustomLineChartWrapper setSelectedTab={setSelectedTab}>
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
          tick={{ fill: "black", fontWeight: 500 }}
          axisLine={{ stroke: themeColor }}
          tickMargin={15}
          angle={selectedTab === 2 ? -45 : 0}
          height={35}
        />
        <YAxis
          strokeOpacity={0}
          tick={{ fill: "black", fontWeight: 500, fontSize: 14 }}
          width={longestLabelLength * 10}
          domain={["dataMin - 100", "dataMax + 100"]}
          tickFormatter={(value) => formatNumber(value)}
        />
        <Tooltip active content={<CumulativeOPDelegatedTooltip />} />
      </LineChart>
    </CustomLineChartWrapper>
  );
};
