import { Box, Divider, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { UserContextType } from '../types/userTypes';
import { BiTargetLock } from 'react-icons/bi';
import { CustomLineChart } from './CustomLineChart';
import { CustomDelegatorsLineChart } from './CustomDelegatorsLineChart';
import { OPDELEGATES_PURPLE, OPDELEGATES_RED } from '../themes';
import { CustomAreaChart } from './CustomAreaChart';
import { CustomTable } from './CustomTable';
import { CustomBarsChart } from './CustomBarsChart';
import { useParams } from 'react-router-dom';
import {
  getOPDelegated,
  getNumDelegators,
  getOPDelegatedDailyDifference,
  getNumDelegatorsDailyDifference,
  geTopDelegators,
} from '../services/opDelegates';
import {
  ShowLoaderContext,
  ShowLoaderContextType,
} from '../contexts/ShowLoaderContext';
import {
  OPDelegated,
  DailyChange,
  NumDelegators,
  DelegatorAmount,
} from '../types/dataTypes';
import { formatAddress } from '../utils/functions';
import { fetchEnsName, fetchEnsAddress } from 'wagmi/actions';
import CustomPieChart from './CustomPieChart';

const CHART_HEIGHT = '330';

const tableHeaders = ['Delegator', 'OP delegated'];

function Dashboard() {
  const { param } = useParams();
  const { user, setUser }: UserContextType = useContext(UserContext);
  const [searchedAddressEnsName, setSearchedAddressEnsName] = useState('');

  const { setShowLoader }: ShowLoaderContextType =
    useContext(ShowLoaderContext);

  const [opDelegatedData, setOpDelegatedData] = useState<OPDelegated[]>([]);
  const [numDelegatorsData, setNumDelegatorsData] = useState<NumDelegators[]>(
    [],
  );

  const [opDelegatedDailyChange, setDelegatedDailyChange] = useState<
    DailyChange[]
  >([]);
  const [numDelegatorsDailyChange, setNumDelegatorsDailyChange] = useState<
    DailyChange[]
  >([]);

  const [topDelegators, setTopDelegators] = useState<DelegatorAmount[]>([]);

  const fetchUserData = useCallback(
    async (address: string) => {
      console.log('FETCHING DATA');
      setShowLoader(true);

      try {
        // Use Promise.allSettled to asynchronously fetch data from multiple sources
        const results = await Promise.allSettled([
          getOPDelegated(address),
          getNumDelegators(address),
          getOPDelegatedDailyDifference(address),
          getNumDelegatorsDailyDifference(address),
          geTopDelegators(address),
        ]);

        const opDelegatedResponse = results[0];
        const numDelegatorsResponse = results[1];
        const opDelegatedDailyChangeResponse = results[2];
        const numDelegatorsDailyChangeResponse = results[3];
        const topDelegatorsResponse = results[4];

        // Handle each settled promise individually
        if (opDelegatedResponse.status === 'fulfilled') {
          setOpDelegatedData(opDelegatedResponse.value.data || []);
        } else {
          setOpDelegatedData([]);
        }

        if (numDelegatorsResponse.status === 'fulfilled') {
          setNumDelegatorsData(numDelegatorsResponse.value.data || []);
        } else {
          setNumDelegatorsData([]);
        }

        if (opDelegatedDailyChangeResponse.status === 'fulfilled') {
          setDelegatedDailyChange(
            opDelegatedDailyChangeResponse.value.data || [],
          );
        } else {
          setDelegatedDailyChange([]);
        }

        if (numDelegatorsDailyChangeResponse.status === 'fulfilled') {
          setNumDelegatorsDailyChange(
            numDelegatorsDailyChangeResponse.value.data || [],
          );
        } else {
          setNumDelegatorsDailyChange([]);
        }

        if (topDelegatorsResponse.status === 'fulfilled') {
          //TO-DO: shoulnd't we use ?? instead of ||?
          const data: DelegatorAmount[] =
            topDelegatorsResponse.value.data || [];
          const mappedData = data.map((d, index) => ({
            ...d,
            rank: index + 1,
          }));
          setTopDelegators(mappedData);
        } else {
          setTopDelegators([]);
        }
      } catch (error) {
        console.error('Error in fetchUserData: ', error);
        setOpDelegatedData([]);
        setNumDelegatorsData([]);
        setDelegatedDailyChange([]);
        setNumDelegatorsDailyChange([]);
        setTopDelegators([]);
      } finally {
        setShowLoader(false);
      }
    },
    [setShowLoader],
  );

  const retrieveEnsName = useCallback(async (address: string) => {
    const ensName = await fetchEnsName({
      address: address as `0x${string}`,
    });
    if (ensName) setSearchedAddressEnsName(ensName);
    else setSearchedAddressEnsName('');
  }, []);

  const retrieveEnsAddress = useCallback(async (ensName: string) => {
    const address = await fetchEnsAddress({
      name: ensName,
    });
    if (address) {
      setSearchedAddressEnsName(ensName);
      fetchUserData(address);
    }
  }, []);

  useEffect(() => {
    if (param) {
      console.log('THERE IS A PARAM');
      if (param?.includes('0x') && param.length === 42) {
        console.log('PARAM IS ADDRESS: ', param);
        fetchUserData(param);
        retrieveEnsName(param);
      } else {
        console.log('PARAM IS NOT ADDRESS: ', param);
        retrieveEnsAddress(param);
      }
    } else if (user?.address) fetchUserData(user?.address);
  }, [fetchUserData, retrieveEnsName, user?.address, param]);

  // Extract the last newBalance value from opDelegatedData
  const lastOpDelegated =
    opDelegatedData[opDelegatedData.length - 1]?.newBalance || 0;

  // Extract the last count value from numDelegatorsData
  const lastNumDelegators =
    numDelegatorsData[numDelegatorsData.length - 1]?.count || 0;

  return (
    <Box px={[4, 4, 12, 20]}>
      <Stack
        py={6}
        justifyContent="space-between"
        // display={['block', 'block', 'flex']}
        direction={['column', 'column', 'row']}
        gap={4}
      >
        <HStack fontSize={[24, 24, 30]}>
          <BiTargetLock color="red" />
          <Text as="b">
            {param
              ? searchedAddressEnsName || formatAddress(param)
              : user?.userName
              ? `@${user?.userName}`
              : user?.formattedAddress}
          </Text>
        </HStack>
        <Box
          background="linear-gradient(91.5deg, rgba(255, 4, 32, 0.5) 0%, rgba(146, 5, 253, 0.5) 100%)"
          padding="1px"
          borderRadius="5px"
        >
          <HStack
            bg="white"
            borderRadius="5px"
            p={4}
            boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.1)"
          >
            <Text fontSize={[16, 16, 20]}>
              <b>{lastOpDelegated.toLocaleString()} OP</b> delegated from{' '}
              <b>{lastNumDelegators.toLocaleString()}</b> delegators
            </Text>
          </HStack>
        </Box>
      </Stack>

      <Divider />

      <Stack py={6} gap={[5, 5, 4]} display="flex">
        {/* Charts */}
        <Stack
          display="flex"
          direction={['column', 'column', 'row']}
          gap={[5, 5, 4]}
        >
          {/* OP Delegated Charts */}
          <Stack gap={[5, 5, 4]} w={['100%', '100%', '50%']}>
            <Box w="100%">
              <Heading mb={4} fontSize={24}>
                OP Delegated
              </Heading>
              <Box h={CHART_HEIGHT}>
                <CustomLineChart
                  data={opDelegatedData}
                  themeColor={OPDELEGATES_RED}
                />
              </Box>
            </Box>

            <Box w="100%">
              <Heading mb={4} fontSize={24}>
                OP Delegated Daily Change
              </Heading>
              <Box h={CHART_HEIGHT}>
                <CustomAreaChart
                  label="OP Delegated"
                  data={opDelegatedDailyChange}
                  themeColor={OPDELEGATES_RED}
                />
              </Box>
            </Box>
          </Stack>

          {/* Delegators Charts */}
          <Stack gap={[5, 5, 4]} w={['100%', '100%', '50%']}>
            <Box w="100%">
              <Heading mb={4} fontSize={24}>
                Delegators
              </Heading>
              <Box h={CHART_HEIGHT}>
                <CustomDelegatorsLineChart
                  data={numDelegatorsData}
                  themeColor={OPDELEGATES_PURPLE}
                />
              </Box>
            </Box>

            <Box w="100%">
              <Heading mb={4} fontSize={24}>
                Delegators Daily Change
              </Heading>
              <Box h={CHART_HEIGHT}>
                <CustomAreaChart
                  label="Delegators"
                  data={numDelegatorsDailyChange}
                  themeColor={OPDELEGATES_PURPLE}
                />
              </Box>
            </Box>
          </Stack>
        </Stack>

        {/* Top delegators */}
        <Stack
          display={['flex']}
          direction={['column', 'column', 'row']}
          gap={[5, 5, 4]}
        >
          <Box w={['100%', '100%', '50%']} h={CHART_HEIGHT}>
            <CustomTable
              label="Top delegators"
              headers={tableHeaders}
              data={topDelegators}
              setData={setTopDelegators}
            />
          </Box>
          <Box w={['100%', '100%', '50%']} h={CHART_HEIGHT}>
            <CustomPieChart
              totalDelegated={lastOpDelegated}
              data={topDelegators.slice(0, 10)}
              label="Delegator sizes"
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Dashboard;
