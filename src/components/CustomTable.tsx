import { ResponsiveContainer } from 'recharts';
import {
  Box,
  HStack,
  Link,
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
  useClipboard,
} from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { formatAddress, formatNumber } from '../utils/functions';
import CustomPagination from './CustomPagination';
import { DelegatorAmount } from '../types/dataTypes';

const PAGE_SIZE = 6;

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
  label,
  data,
}: {
  headers: string[];
  label: string;
  data: DelegatorAmount[];
}) => {
  const { hasCopied, onCopy, value, setValue } = useClipboard('');
  useEffect(() => {
    onCopy();
  }, [value]);

  const [dataToShow, setDataToShow] = useState<DelegatorAmount[]>([]);

  //The first time this component loads
  useEffect(() => {
    if (data.length > 0) {
      setDataToShow(data.slice(0, PAGE_SIZE));
    }
  }, [data]);

  const onPageChange = useCallback(
    (currentPage: number) => {
      const initial = (currentPage - 1) * PAGE_SIZE;
      setDataToShow(data.slice(initial, initial + PAGE_SIZE));
    },
    [data],
  );

  return (
    <CustomTableWrapper label={label}>
      <TableContainer>
        <Table w="100%" variant="striped" size="sm">
          <Thead>
            <Tr>
              <Td>
                <Text as="b">#</Text>
              </Td>
              {headers.map((header) => (
                <Td key={header}>
                  <Text as="b">{header}</Text>
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody w="100%">
            {dataToShow.map((d, index) => (
              <Tr key={index} w="100%">
                <Td w="25%" borderColor="transparent">
                  {d.rank}
                </Td>
                <Td w="40%" borderColor="transparent">
                  <HStack>
                    <Text>
                      {hasCopied && value === d.delegator
                        ? 'Copied!'
                        : d?.ensName ?? formatAddress(d.delegator)}
                    </Text>
                    <FaRegCopy
                      cursor="pointer"
                      color="gray.500"
                      onClick={() => {
                        setValue(d.delegator);
                      }}
                    />
                  </HStack>
                </Td>
                <Td w="30%" borderColor="transparent">
                  {formatNumber(d.amount)} OP
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box mt={2}>
          <CustomPagination
            total={data.length}
            pageSize={PAGE_SIZE}
            onPageChange={onPageChange}
          />
        </Box>
      </TableContainer>
    </CustomTableWrapper>
  );
};
