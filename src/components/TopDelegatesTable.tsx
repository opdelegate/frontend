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
    Input,
    InputGroup,
    InputRightElement,
  } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import CustomPagination from './CustomPagination';
import { FaRegCopy } from 'react-icons/fa';
import { calculatePercentage, formatAddress, formatNumber } from '../utils/functions';
import { GLOBAL_ROUTES } from '../App';
import { useNavigate } from 'react-router-dom';
import { SlMagnifier } from 'react-icons/sl';
// import { useContext } from 'react';
// import { UserContext } from '../contexts/UserContext';
// import { UserContextType } from '../types/userTypes';
import { User } from '../types/userTypes';


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
    const [searchValue, setSearchValue] = useState('');

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

    // filter out the specific row and set the setDataToShow to the filtered data
    const handleSearchSubmit = () => {
        const filteredData = data.filter((d) => {
          return d.address.toLowerCase().includes(searchValue.toLowerCase()) || d.ensName?.toLowerCase().includes(searchValue.toLowerCase());
        });
        setDataToShow(filteredData.slice(0, pageSize));
    };
  
    return (
      <Box
        boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.1)"
        borderRadius="15px"
        px={4}
        pt={2}
        height="inherit"
        background="white"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" pt={2}>
            <Text as="b" fontSize="20px" color="black">
                {label}
            </Text>
            <InputGroup size={['sm', 'sm', 'md']} w='216px'>
                <Input
                    _placeholder={{ color: 'gray.400' }}
                    _focusVisible={{ borderColor: 'none', boxShadow: 'none' }}
                    placeholder="Search..."
                    color="gray.500"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
                <InputRightElement
                    width="2.5rem"
                    borderLeft="1px #e2e8f0 solid"
                    cursor="pointer"
                    onClick={handleSearchSubmit}
                >
                    <Box color="#555555d9">
                    <SlMagnifier />
                    </Box>
                </InputRightElement>
            </InputGroup>
        </Box>

        <Box pb={6} pt={4}>
            <TableContainer>
            <Table w="100%" variant="striped" size="sm">
                <Thead>
                <Tr>
                    <Td>
                    <Text as="b">#</Text>
                    </Td>
                    {headers.map((header) => (
                    <Td>
                        <Text as="b">{header}</Text>
                    </Td>
                    ))}
                </Tr>
                </Thead>
                <Tbody w="100%">
                {dataToShow.map((d) => (
                    <Tr key={d.address} w="100%">
                    <Td w="20%" borderColor="transparent">
                        {d.rank}
                    </Td>
                    <Td w="30%" borderColor="transparent">
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
                    <Td w="20%" borderColor="transparent">
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


