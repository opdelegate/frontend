import { Box, Spinner, Image } from '@chakra-ui/react';
import Logo from './Logo';

const Loader = () => {
  return (
    <Box
      position="absolute"
      width="100%"
      height="100vh"
      top={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      background="linear-gradient(135deg, #F9ECCC 0%, #F7F8FC 50%, #F9C7D0 100%)"
    >
      <Box textAlign="center">
        {/* <Spinner
          size="xl"
          mb={4}
          thickness="4px"
          speed="0.5s"
          emptyColor="gray.200"
          color="red"
          background="linear-gradient(135deg, #FC0D29 0%, #9306FC 100%)"
        /> */}

        <Box display="flex" justifyContent="center">
          <Image
            src="/spinner.png"
            //   sizes="40px"
            width={14}
            height={14}
            // spin is the name of an animation created in index.css
            style={{ animation: `spin 1s linear infinite` }}
            mb={4}
          />
        </Box>

        <Logo size={40} />
      </Box>
    </Box>
  );
};

export default Loader;
