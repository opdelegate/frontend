import { Box, Button, Heading, Text, Image, Stack } from '@chakra-ui/react';
import { useCallback, useContext } from 'react';
import { User, UserContextType } from '../types/userTypes';
import {
  setItemToLocalStorage,
  LOCALSTORAGE_OBJECTS_NAMES,
} from '../utils/localStorageFunctions';
import {
  ShowLoaderContextType,
  ShowLoaderContext,
} from '../contexts/ShowLoaderContext';
import { UserContext } from '../contexts/UserContext';

const LandingPage = () => {
  const { user, setUser }: UserContextType = useContext(UserContext);
  const { setShowLoader }: ShowLoaderContextType =
    useContext(ShowLoaderContext);

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

  return (
    <Stack
      background="linear-gradient(135deg, #F9ECCC 0%, #F7F8FC 50%, #F9C7D0 100%)"
      width="100%"
      minH="100%"
      px={[4, 4, 12, 20]}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      direction={['column', 'column', 'column', 'column', 'row']}
    >
      <Box
        width={['100%', '100%', 450, 450, 450]}
        pt={16}
        textAlign={['center', 'center', 'center', 'center', 'start']}
      >
        <Heading
          width="inherit"
          mb={4}
          fontFamily="Artico"
          fontStyle="italic"
          fontSize="4xl"
        >
          Track and analyze Optimism delegation using onchain data.
        </Heading>
        <Text mb={4} color="#757B8A">
          Empowering the Optimism Collective by granting delegates instant
          insights. Seamlessly explore your own real-time metrics or view the
          data of any other delegate.
        </Text>
        <Button
          variant="solid"
          borderRadius="60px"
          background="linear-gradient(90deg, #F30F21 0%, #9205FD 100%)"
          paddingY="16px"
          paddingX={['12px', '12px', '40px']}
          color="white"
          fontSize="14px"
          h="45px"
          w="141px"
          onClick={connect}
        >
          Connect Wallet
        </Button>
      </Box>

      <Box width={['100%', '100%', 750, 750, 750]}>
        <Box position="relative" top={0}>
          <Image
            zIndex={1}
            position="relative"
            src="/images/landing_image.png"
            // filter="drop-shadow(-10px -10px 10px rgba(0, 0, 0, 0.25))"
          />
          {/* <Box> */}
          <Image
            position="absolute"
            top="3%"
            right="30%"
            width="33%"
            src="/images/gear.png"
            // spin is the name of an animation created in index.css
            style={{ animation: `spin 15s linear infinite` }}
          />
          <Image
            position="absolute"
            top="40%"
            left="8%"
            width="12%"
            src="/images/left-circle.png"
            // bounce is the name of an animation created in index.css
            style={{ animation: `bounce 3s alternate infinite` }}
          />
          <Image
            position="absolute"
            top="18%"
            right="4%"
            width="20%"
            src="/images/right-circle.png"
            // bounce is the name of an animation created in index.css
            style={{
              animation: `bounce 3s alternate infinite`,
              animationDelay: '1s',
            }}
          />
          {/* </Box> */}
        </Box>
      </Box>
    </Stack>
  );
};

export default LandingPage;
