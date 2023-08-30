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
      height="70px"
      backgroundColor="white"
      justifyContent="space-between"
      boxShadow="rgba(95, 95, 95, 0.05)"
    >
      <Box>
        <svg
          width="230"
          height="24"
          viewBox="0 0 230 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.392 11.8C22.08 18.424 17.056 23.384 10.336 23.384C3.648 23.384 0.544 18.424 1.856 11.8C3.136 5.208 8.16 0.216 14.848 0.216C21.568 0.216 24.672 5.208 23.392 11.8ZM7.744 11.8C6.912 15.992 8.288 18.584 11.264 18.584C14.272 18.584 16.672 15.992 17.504 11.8C18.304 7.64 16.928 5.048 13.92 5.048C10.944 5.048 8.544 7.64 7.744 11.8ZM45.117 8.12C44.125 13.176 40.125 15.64 34.461 15.64H32.061L30.653 23H24.829L29.181 0.599998H37.405C43.069 0.599998 46.109 3.064 45.117 8.12ZM39.229 8.12C39.645 6.008 38.557 5.144 36.285 5.144H34.109L32.957 11.096H35.133C37.405 11.096 38.813 10.232 39.229 8.12ZM54.827 5.336L52.299 18.264H54.667C57.899 18.264 60.491 16.216 61.355 11.8C62.187 7.384 60.427 5.336 57.195 5.336H54.827ZM67.275 11.8C65.931 18.616 60.811 23 53.867 23H45.579L49.931 0.599998H58.219C65.163 0.599998 68.587 5.016 67.275 11.8ZM68.6728 23L73.0248 0.599998H88.3528L87.4568 5.176H77.9848L77.1848 9.208H85.5368L84.6408 13.784H76.2888L75.3928 18.424H85.1528L84.2888 23H68.6728ZM87.8915 23L92.2435 0.599998H98.0675L94.6115 18.264H104.212L103.316 23H87.8915ZM106.173 23L110.525 0.599998H125.853L124.957 5.176H115.485L114.685 9.208H123.037L122.141 13.784H113.789L112.893 18.424H122.653L121.789 23H106.173ZM126.544 11.8C127.888 4.792 133.04 0.216 139.792 0.216C145.168 0.216 148.112 3.576 148.112 8.408H142.224C142.16 6.168 140.688 5.048 138.736 5.048C135.888 5.048 133.296 7.352 132.432 11.8C131.536 16.28 133.392 18.584 136.24 18.584C138.992 18.584 140.88 16.984 141.424 14.616H136.688L137.456 10.68H147.824L147.44 12.728C146.064 19.832 141.424 23.384 135.44 23.384C128.688 23.384 125.168 18.808 126.544 11.8ZM166.771 0.599998L169.971 23H163.763L163.283 18.776H155.731L153.683 23H147.475L159.379 0.599998H166.771ZM162.003 6.04L157.971 14.264H162.867C162.579 11.512 162.291 8.76 162.003 6.04ZM175.811 23L179.235 5.336H172.963L173.891 0.599998H192.323L191.395 5.336H185.091L181.667 23H175.811ZM190.829 23L195.181 0.599998H210.509L209.613 5.176H200.141L199.341 9.208H207.693L206.797 13.784H198.445L197.549 18.424H207.309L206.445 23H190.829ZM218.656 18.872C220.544 18.872 221.728 18.104 221.952 16.92C222.208 15.608 221.696 14.936 218.016 13.784C213.504 12.408 212.128 9.976 212.768 6.68C213.504 2.904 216.832 0.216 221.952 0.216C227.744 0.216 229.664 3.288 229.344 7.288C227.456 7.288 225.536 7.32 223.68 7.32C223.84 5.88 223.168 4.76 221.504 4.76C219.84 4.76 218.88 5.496 218.688 6.488C218.464 7.672 219.008 8.44 222.048 9.4C226.592 10.872 228.704 12.664 227.968 16.536C227.168 20.664 223.328 23.384 217.952 23.384C214.048 23.384 211.456 21.432 210.016 18.456L213.248 16.088C214.656 17.976 216.416 18.872 218.656 18.872Z"
            fill="#FF0420"
          />
        </svg>
      </Box>

      <Box display="flex" gap={[2, 2, 6]} alignItems="center">
        <InputGroup>
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
            minW="auto"
            h="35px"
            onClick={disconnect}
          >
            <Avatar
              //   size="full"
              h="100%"
              w="35px"
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
