import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    Line,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";
  import { CumulativeDelegatorsTooltip } from "./CumulativeDelegatorsTooltip";
  import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
  import { useMemo, useState } from "react";
  import { NumDelegatorsResponse } from "../types/responsesTypes";
  import { formatDate, formatNumber } from "../utils/functions";
  
  export const CustomDelegatorsLineChart = ({
    data,
    themeColor,
  }: {
    data: NumDelegatorsResponse[];
    themeColor: string;
  }) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
  
    const filteredAndFormattedData = useMemo(() => {
        const today = new Date();
        const daysToSlice = selectedTab === 0 ? 7 : selectedTab === 1 ? 30 : 365;
        const filteredData = data.filter((d) => {
          const date = new Date(d.day);
          // Ensuring both values are dates and performing the subtraction.
          return (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24) <= daysToSlice;
        });
      
        return filteredData.map((d) => ({
          label: formatDate(d.day, {
            month: selectedTab === 2 ? 'short' : 'numeric',
            day: 'numeric',
          }),
          quantity: d.count,
        }));
      }, [data, selectedTab]);
      
  
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
        <Tabs padding={0} mb={4} onChange={(index) => setSelectedTab(index)}>
          <TabList>
            <Tab
              _selected={{
                color: themeColor,
                borderColor: themeColor,
              }}
              fontWeight={600}
            >
              This Week
            </Tab>
            <Tab
              _selected={{
                color: themeColor,
                borderColor: themeColor,
              }}
              fontWeight={600}
            >
              This Month
            </Tab>
            <Tab
              _selected={{
                color: themeColor,
                borderColor: themeColor,
              }}
              fontWeight={600}
            >
              This Year
            </Tab>
          </TabList>
        </Tabs>
  
        <Box height="calc(100% - 58px)">
          <ResponsiveContainer>
            <LineChart data={filteredAndFormattedData}>
              <CartesianGrid stroke="#ccc" strokeDasharray="3" vertical={false} />
              <Line type="monotone" dataKey="quantity" stroke={themeColor} strokeWidth={2} />
              <XAxis
                dataKey="label"
                tickLine={{ opacity: 0 }}
                tick={{ fill: "black", fontWeight: 500 }}
                axisLine={{ stroke: themeColor }}
                tickMargin={15}
              />
              <YAxis
                strokeOpacity={0}
                tick={{ fill: "black", fontWeight: 500, fontSize: 14 }}
                domain={["dataMin - 100", "dataMax + 100"]}
                tickFormatter={(value) => formatNumber(value)}
              />
              <Tooltip content={<CumulativeDelegatorsTooltip />} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };
  