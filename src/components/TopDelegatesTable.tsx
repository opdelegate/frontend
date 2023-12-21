import { Delegates } from '../types/dataTypes';
import {
    Box,
    HStack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Thead,
    Th,
    Tr,
    useClipboard,
    calc,
  } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CustomPagination from './CustomPagination';
import { FaRegCopy } from 'react-icons/fa';
import { calculatePercentage, formatAddress, formatNumber } from '../utils/functions';
import { ResponsiveContainer } from 'recharts';
import { GLOBAL_ROUTES } from '../App';
import { useNavigate } from 'react-router-dom';


export const TopDelegatesTable = ({
    headers,
    label,
    data,
    pageSize,
}: {
    headers: string[];
    label: string;
    data: Delegates[];
    pageSize: number;
}) => {
    const { hasCopied, onCopy, value, setValue } = useClipboard('', 500);
    useEffect(() => {
      if (value) {
        onCopy();
        setTimeout(() => {
          setValue('');
        }, 500);
      }
    }, [value]);

    const navigate = useNavigate();
    const [dataToShow, setDataToShow] = useState<Delegates[]>([]);

    //The first time this component loads
    useEffect(() => {
        if (data.length > 0) {
        setDataToShow(data.slice(0, pageSize));
        }
    }, [data]);

    const onPageChange = useCallback(
        (currentPage: number) => {
        const initial = (currentPage - 1) * pageSize;
        setDataToShow(data.slice(initial, initial + pageSize));
    },[data]);
  
    return (
      <Box
        boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.1)"
        borderRadius="15px"
        px={4}
        pt={2}
        height="inherit"
        background="white"
      >
        <HStack justifyContent="space-between" pt={2}>
            <Text as="b" fontSize="20px" color="black">
            {label}
            </Text>
        </HStack>
        <Box pb={6} pt={4}>
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
                        <Text 
                            cursor="pointer"
                            onClick={() => {
                                navigate(`${GLOBAL_ROUTES.ROOT}${d.address}`);
                            }}
                        >
                            {hasCopied && value === d.address
                            ? 'Copied!'
                            : d.ensName !== null ? d.ensName : formatAddress(d.address)}
                        </Text>
                        <FaRegCopy
                            cursor="pointer"
                            color="gray.500"
                            onClick={() => {
                            setValue(d.address);
                            }}
                        />
                        </HStack>
                    </Td>
                    <Td w="30%" borderColor="transparent">
                        {formatNumber(Math.round(d.supply))} OP
                    </Td>
                        <Td w="30%" borderColor="transparent">
                        {calculatePercentage(d.supplyPct)}
                    </Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
            <Box mt={2}>
                <CustomPagination
                total={data.length}
                pageSize={pageSize}
                onPageChange={onPageChange}
                />
            </Box>
            </TableContainer>
        </Box>
      </Box>
    );
}


