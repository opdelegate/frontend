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
      <HStack ref={headref} justifyContent="space-between" mb={3} py={2}>
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
        <Table variant="striped" colorScheme="teal">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              {headers.map((header) => (
                <Th key={header}>{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((d, index) => (
              <Tr key={index}>
                <Td>{d.n}</Td>
                <Td>{d.address}</Td>
                <Td>{d.delegated} OP</Td>
              </Tr>
            ))}
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
    </CustomTableWrapper>
  );
};
