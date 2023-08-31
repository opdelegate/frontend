import {
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useCallback, useContext, useMemo } from 'react';
import { SlMagnifier } from 'react-icons/sl';
import { BiLogInCircle } from 'react-icons/bi';
import useWindowSize from '../hooks/useWindowSize';
import { UserContext } from '../contexts/UserContext';
import { User, UserContextType } from '../types/userTypes';
import {
  setItemToLocalStorage,
  LOCALSTORAGE_OBJECTS_NAMES,
  removeItemFromLocalStorage,
} from '../utils/localStorageFunctions';
import {
  ShowLoaderContext,
  ShowLoaderContextType,
} from '../contexts/ShowLoaderContext';
import Logo from './Logo';

function Navbar() {
  const windowsSize = useWindowSize();
  const { user, setUser }: UserContextType = useContext(UserContext);
  const { showLoader, setShowLoader }: ShowLoaderContextType =
    useContext(ShowLoaderContext);
  const onSearch = useCallback(() => {}, []);

  const connect = useCallback(() => {
    setShowLoader(true);
    const loggedInUser: User = {
      address: '0x11...d752',
      userName: '',
      profileImage: '',
    };
    setItemToLocalStorage(LOCALSTORAGE_OBJECTS_NAMES.USER, loggedInUser);
    setUser(loggedInUser);

    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  }, [setShowLoader, setUser]);

  const disconnect = useCallback(() => {
    removeItemFromLocalStorage(LOCALSTORAGE_OBJECTS_NAMES.USER);
    setUser(undefined);
  }, [setUser]);

  //   const buttonIcon = useMemo(() => {
  //     return user ? <BiLogOutCircle /> : <BiLogInCircle />;
  //   }, [user]);

  //   const buttonText = useMemo(() => {
  //     return user ? 'Disconnect Wallet' : 'Connect Wallet';
  //   }, [user]);

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
      <Logo size={[40, 40, 56]} />

      <Box display="flex" gap={[2, 2, 6]} alignItems="center">
        <InputGroup size={['sm', 'sm', 'md']}>
          <Input
            pr="3.5rem"
            _placeholder={{ color: 'gray.400' }}
            _focusVisible={{ borderColor: 'none', boxShadow: 'none' }}
            placeholder="Search address"
            color="gray.500"
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
          <Button
            variant="solid"
            borderRadius="60px"
            background="#F8F8F8"
            gap={1}
            color="black"
            fontSize="14px"
            padding={isLargeScreen ? '0 12px 0 0' : 0}
            minW="141px"
            // h="35px"
            h="45px"
            justifyContent="flex-start"
            onClick={disconnect}
          >
            <Avatar
              //   size="full"
              h="100%"
              //   w="35px"
              w="45px"
              name={user.userName}
              //   backgroundColor={ADJUSTANT_GREEN}
              fontSize="3xl"
              color="white"
            />

            {isLargeScreen ? (
              <Text px={1} as="b">
                {user?.userName ? `@${user?.userName}` : user?.address}
              </Text>
            ) : null}
          </Button>
        ) : (
          <Button
            variant="solid"
            borderRadius="60px"
            background="linear-gradient(90deg, #F30F21 0%, #9205FD 100%)"
            paddingY="16px"
            paddingX={['12px', '12px', '40px']}
            color="white"
            fontSize="14px"
            h="45px"
            onClick={connect}
          >
            {isLargeScreen ? 'Connect Wallet' : <BiLogInCircle />}
          </Button>
        )}
      </Box>
    </HStack>
  );
}

export default Navbar;
