import { ResponsiveContainer } from 'recharts';
import {
  Box,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import { formatNumber } from '../utils/functions';
import CustomPagination from './CustomPagination';

export const CustomTableWrapper = ({
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
    return 38;
  }, []);

  return (
    <Box
      boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.1)"
      borderRadius="15px"
      px={4}
      pt={1}
      //   pb={4}
      height="inherit"
      background="white"
    >
      <HStack ref={headref} justifyContent="space-between" pt={2}>
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

export const CustomTable = ({
  headers,
  data,
  label,
}: //   themeColor,
{
  headers: string[];
  data: { n: number; address: string; delegated: number }[];
  label: string;
  //   themeColor: string;
}) => {
  return (
    <CustomTableWrapper label={label}>
      <TableContainer>
        <Table
          w="100%"
          variant="striped"
          size="sm"
          __css={
            {
              // 'table-layout': 'fixed',
              //   width: 'full'
            }
          }
        >
          <Thead>
            <Tr>
              {headers.map((header) => (
                // <Th key={header}>
                //   <Text as="b">{header}</Text>
                // </Th>
                <Td key={header}>
                  <Text as="b">{header}</Text>
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody w="100%">
            {data.map((d, index) => (
              <Tr key={index} w="100%">
                <Td w="25%" borderColor="transparent">
                  {d.n}
                </Td>
                <Td w="40%" borderColor="transparent">
                  {d.address}
                </Td>
                <Td w="30%" borderColor="transparent">
                  {formatNumber(d.delegated)} OP
                </Td>
              </Tr>
            ))}
          </Tbody>
          {/* <Tfoot> */}
          {/* </Tfoot> */}
        </Table>
        <Box mt={2}>
          <CustomPagination />
        </Box>
      </TableContainer>
    </CustomTableWrapper>
  );
};
