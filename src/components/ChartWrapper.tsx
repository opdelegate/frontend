import { Tabs, TabList, Tab, Box } from '@chakra-ui/react';
import { useRef, useMemo } from 'react';
import { ResponsiveContainer } from 'recharts';
import { OPDELEGATES_RED } from '../themes';

const ChartWrapper = ({
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

export default ChartWrapper;
