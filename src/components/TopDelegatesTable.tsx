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

export const TopDelegatesTable = ({
    headers,
    label,
    data,
    pageSize,
    connectWalletAddress,
}: {
    headers: string[];
    label: string;
    data: Delegates[];
    pageSize: number;
    connectWalletAddress: string | undefined;
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
    const [connectedUserDelegate, setConnectedUserDelegate] = useState<Delegates|null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchedResult, setSearchedResult] = useState<Delegates[]>([]);

    const setUserData = useCallback(() => {
        if (connectWalletAddress) {
            const connectedUserDelegate = data.find((d) => d.address === connectWalletAddress);
            if (connectedUserDelegate) {
                setConnectedUserDelegate(connectedUserDelegate);
            }
        }
    }, [connectWalletAddress, data]);

    // The first time this component loads
    useEffect(() => {
        if (data.length > 0) {
            setDataToShow(data.slice(0, pageSize));
            setSearchedResult(data);
            setUserData();
        }
    }, [data, connectWalletAddress]);

    const onPageChange = useCallback(
        (currentPage: number) => {
        const initial = (currentPage - 1) * pageSize;
        setDataToShow(searchedResult.slice(initial, initial + pageSize));
    },[]);

    // filter out the specific row and set the setDataToShow to the filtered data
    useEffect(() => {
        const filteredData = data.filter((d) => {
            return d.address.toLowerCase().includes(searchValue.toLowerCase()) || (d.ensName && d.ensName.toLowerCase().includes(searchValue.toLowerCase()));
        });
        setSearchedResult(filteredData);
        setDataToShow(filteredData.slice(0, pageSize));
    }, [searchValue]);
  
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
                >
                    <Box color="#555555d9">
                    <SlMagnifier />
                    </Box>
                </InputRightElement>
            </InputGroup>
        </Box>
        {connectedUserDelegate && (
            <Box pt={4}>
                <TableContainer>
                    <Table w="100%" size="sm">
                        <Tbody w="100%">
                        <Tr w="100%" backgroundColor='#F30F210D'>
                            <Td w="20%" borderColor="#FF0420" textColor='#FF0420' borderTop='1px' fontSize='20px' fontWeight={700}>
                                {connectedUserDelegate.rank}
                            </Td>
                            <Td w="30%" borderColor="#FF0420" textColor='#FF0420' borderTop='1px' fontSize='20px' fontWeight={700}>
                                {(connectedUserDelegate.ensName !== null ? connectedUserDelegate.ensName : formatAddress(connectedUserDelegate.address))}
                            </Td>
                            <Td w="30%" borderColor="#FF0420" textColor='#FF0420' borderTop='1px' fontSize='20px' fontWeight={700}>
                                {formatNumber(Math.round(connectedUserDelegate.supply))} OP
                            </Td>
                            <Td w="20%" borderColor="#FF0420" textColor='#FF0420' borderTop='1px' fontSize='20px' fontWeight={700}>
                                {calculatePercentage(connectedUserDelegate.supplyPct)}
                            </Td>
                        </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        )}
        <Box pb={6} pt={4}>
            <TableContainer>
            <Table w="100%" size="sm">
                <Thead>
                <Tr backgroundColor='#F8F8F8'>
                    <Td>
                    <Text as="b">#</Text>
                    </Td>
                    {headers.map((header, idx) => (
                    <Td key={idx}>
                        <Text as="b">{header}</Text>
                    </Td>
                    ))}
                </Tr>
                </Thead>
                <Tbody w="100%">
                {dataToShow.map((d, index) => (
                    <Tr key={index} w="100%"  backgroundColor={d.address === connectedUserDelegate?.address ? '#F30F210D' : index % 2 === 1 ? '#EBF2FF80' : 'inherit' }>
                    <Td w="20%" borderColor="transparent" textColor={d.address === connectedUserDelegate?.address ? '#FF0420' : 'inherit'}>
                        {d.rank}
                    </Td>
                    <Td w="30%" borderColor="transparent" textColor={d.address === connectedUserDelegate?.address ? '#FF0420' : 'inherit'}>
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
                    <Td w="30%" borderColor="transparent"  textColor={d.address === connectedUserDelegate?.address ? '#FF0420' : 'inherit'}>
                        {formatNumber(Math.round(d.supply))} OP
                    </Td>
                    <Td w="20%" borderColor="transparent"  textColor={d.address === connectedUserDelegate?.address ? '#FF0420' : 'inherit'}>
                        {calculatePercentage(d.supplyPct)}
                    </Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
            <Box mt={2}>
                <CustomPagination
                total={searchedResult.length}
                pageSize={pageSize}
                onPageChange={onPageChange}
                />
            </Box>
            </TableContainer>
        </Box>
      </Box>
    );
}


