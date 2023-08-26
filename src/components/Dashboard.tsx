import { Box, Divider, HStack, Stack, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { UserContextType } from '../types/userTypes';
import { BiTargetLock } from 'react-icons/bi';
import { CustomLineChart } from './CustomLineChart';
import { OPDELEGATES_PURPLE, OPDELEGATES_RED } from '../themes';
import { CustomAreaChart } from './CustomAreaChart';
import { CustomTable } from './CustomTable';

function Dashboard() {
  const { user, setUser }: UserContextType = useContext(UserContext);

  const [opDelegatedData, setPpDelegatedData] = useState([
    { month: 'Feb', date: '08/03/2023', quantity: 10 },
    { month: 'Feb', date: '08/03/2023', quantity: 20 },
    { month: 'Feb', date: '08/03/2023', quantity: 30 },
    { month: 'Feb', date: '08/03/2023', quantity: 35 },
    { month: 'Feb', date: '08/03/2023', quantity: 35 },
    { month: 'Feb', date: '08/03/2023', quantity: 40 },
    { month: 'Feb', date: '08/03/2023', quantity: 43 },
  ]);

  const tableHeaders = ['#', 'Delegator', 'OP delegated'];
  const tableData = [{ n: 1, address: 'asdasda', delegated: 1200 }];

  return (
    <Box px={[4, 4, 12]}>
      <HStack justifyContent="space-between" py={6}>
        <HStack fontSize={[24, 24, 30]}>
          <BiTargetLock color="red" />
          <Text as="b">{user?.address}</Text>
        </HStack>
        <Box
          background="linear-gradient(91.5deg, rgba(255, 4, 32, 0.5) 0%, rgba(146, 5, 253, 0.5) 100%)"
          padding="1px"
          borderRadius="5px"
        >
          <HStack
            bg="white"
            borderRadius="5px"
            p="20px"
            boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.1)"
          >
            <Text fontSize={[16, 16, 20]}>
              <b>86,000 OP</b> delegated from <b>462</b> delegators
            </Text>
          </HStack>
        </Box>
      </HStack>
      <Divider />

      <Stack py={6} gap={2} display="flex">
        {/* Line Charts */}
        <Stack
          display={['flex']}
          direction={['column', 'column', 'row']}
          gap={2}
        >
          <Box w={['100%', '100%', '50%']} height="inherit" h="300">
            <CustomLineChart
              data={opDelegatedData}
              themeColor={OPDELEGATES_RED}
            />
          </Box>
          <Box w={['100%', '100%', '50%']} height="inherit" h="300">
            <CustomLineChart
              data={opDelegatedData}
              themeColor={OPDELEGATES_PURPLE}
            />
          </Box>
        </Stack>

        {/* Area Charts */}
        <Stack
          display={['flex']}
          direction={['column', 'column', 'row']}
          gap={2}
        >
          <Box w={['100%', '100%', '50%']} height="inherit" h="300">
            <CustomAreaChart
              data={opDelegatedData}
              label="OP Delegated"
              themeColor={OPDELEGATES_RED}
            />
          </Box>
          <Box w={['100%', '100%', '50%']} height="inherit" h="300">
            <CustomAreaChart
              label="Delegators"
              data={opDelegatedData}
              themeColor={OPDELEGATES_PURPLE}
            />
          </Box>
        </Stack>

        {/* Top delegators */}
        <Stack>
          <Box w={['100%', '100%', '50%']} height="inherit" h="300">
            <CustomTable
              label="Top delegators"
              headers={tableHeaders}
              data={tableData}
            />
          </Box>
          <Box w={['100%', '100%', '50%']} height="inherit" h="300"></Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Dashboard;
