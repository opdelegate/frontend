import {
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SlMagnifier } from 'react-icons/sl';
import useWindowSize from '../hooks/useWindowSize';
import { UserContext } from '../contexts/UserContext';
import { User, UserContextType } from '../types/userTypes';
import {
  LOCALSTORAGE_OBJECTS_NAMES,
  removeItemFromLocalStorage,
  setItemToLocalStorage,
} from '../utils/localStorageFunctions';
import Logo from './Logo';
import {
  useAccount,
  useEnsName,
  useConnect,
  useDisconnect,
  useEnsAvatar,
} from 'wagmi';
import ConnectWalletButton from './ConnectWalletButton';
import { useNavigate } from 'react-router-dom';
import { GLOBAL_ROUTES } from '../App';
import { formatAddress } from '../utils/functions';
import { BiLogInCircle } from 'react-icons/bi';

function Navbar() {
  const windowsSize = useWindowSize();
  const navigate = useNavigate();
  const { user, setUser }: UserContextType = useContext(UserContext);
  const [searcherValue, setSearcherValue] = useState(
    // '0x6EdA5aCafF7F5964E1EcC3FD61C62570C186cA0C',
    '',
  );

  //WAGMI
  const { address, isConnected, isDisconnected, isConnecting, isReconnecting } =
    useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  //
  const onSearch = useCallback(() => {
    // console.log('VALUE TO SEARCH: ', searcherValue);
    if (searcherValue)
      navigate(`${GLOBAL_ROUTES.ROOT}${searcherValue}`, { replace: true });
  }, [navigate, searcherValue]);

  useEffect(() => {
    // console.log({ isConnected, isDisconnected, address, ensName, ensAvatar });
    if (isConnected && !user && address) {
      console.log('A');
      const a = address ?? '';
      const loggedInUser: User = {
        address: a,
        formattedAddress: formatAddress(a),
        userName: ensName ?? '',
        profileImage: ensAvatar ?? '',
      };
      setItemToLocalStorage(LOCALSTORAGE_OBJECTS_NAMES.USER, loggedInUser);
      setUser(loggedInUser);
      // Muted this bcs it was redirecting to root when an address was in the url
      //   navigate(GLOBAL_ROUTES.ROOT);
    }
    if (isDisconnected && user) {
      console.log('B');
      removeItemFromLocalStorage(LOCALSTORAGE_OBJECTS_NAMES.USER);
      setUser(undefined);
      //   navigate(GLOBAL_ROUTES.ROOT);
    }
  }, [
    address,
    ensAvatar,
    ensName,
    isConnected,
    isDisconnected,
    navigate,
    setUser,
    user,
  ]);

  const isLargeScreen = useMemo(() => {
    return windowsSize.width >= 768;
  }, [windowsSize.width]);

  return (
    <HStack
      px={[4, 4, 14, 24]}
      height="66px"
      backgroundColor="white"
      justifyContent="space-between"
      boxShadow="0px 4px 10px 0px rgba(95, 95, 95, 0.05)"
      position="relative"
    >
      <Box cursor="pointer" onClick={() => navigate(GLOBAL_ROUTES.ROOT)}>
        <Logo size={[40, 40, 56]} />
      </Box>

      <Box display="flex" gap={[2, 2, 6]} alignItems="center">
        <InputGroup size={['sm', 'sm', 'md']}>
          <Input
            pr="3.5rem"
            _placeholder={{ color: 'gray.400' }}
            _focusVisible={{ borderColor: 'none', boxShadow: 'none' }}
            placeholder="Search address"
            color="gray.500"
            value={searcherValue}
            onChange={(e) => {
              setSearcherValue(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearch();
              }
            }}
          />
          <InputRightElement
            onClick={onSearch}
            width="2.5rem"
            borderLeft="1px #e2e8f0 solid"
            cursor="pointer"
          >
            <Box color="#555555d9">
              <SlMagnifier />
            </Box>
          </InputRightElement>
        </InputGroup>

        {user ? (
          <Menu>
            <MenuButton as={Box} cursor="pointer">
              <Button
                variant="solid"
                borderRadius="60px"
                background="#F8F8F8"
                gap={1}
                color="black"
                fontSize="14px"
                padding={isLargeScreen ? '0 12px 0 0' : 0}
                minW={['45px', '45px', '141px']}
                // h="35px"
                h="45px"
                justifyContent="flex-start"
                onClick={() => {
                  console.log('Disconnecting');
                  disconnect();
                }}
              >
                <Avatar
                  h="100%"
                  w="45px"
                  name={user.userName}
                  src={user.profileImage}
                  fontSize="3xl"
                  color="white"
                />

                {isLargeScreen ? (
                  <Text px={1} as="b">
                    {user?.userName
                      ? `@${user?.userName}`
                      : user?.formattedAddress}
                  </Text>
                ) : null}
              </Button>
            </MenuButton>
            <MenuList zIndex={2}>
              <MenuItem
                onClick={() => {
                  console.log('Disconnecting');
                  disconnect();
                }}
                cursor="pointer"
                as="b"
              >
                Disconnect
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Box minW="45px">
            <ConnectWalletButton
              connectors={connectors}
              isLoading={isLoading}
              connect={connect}
              pendingConnector={pendingConnector}
              isLargeScreen={isLargeScreen}
              responsive
            />
          </Box>
        )}
      </Box>
    </HStack>
  );
}

export default Navbar;
