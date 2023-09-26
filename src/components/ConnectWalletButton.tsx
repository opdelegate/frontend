import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import { BiLogInCircle } from 'react-icons/bi';
import { Connector } from 'wagmi';

const ConnectWalletButton = ({
  connectors,
  isLoading,
  isLargeScreen,
  responsive,
  connect,
  pendingConnector,
}: {
  connectors: Connector<any, any>[];
  isLoading: boolean;
  isLargeScreen?: boolean;
  responsive?: boolean;
  connect: (args?: Partial<any> | undefined) => void;
  pendingConnector: Connector<any, any> | undefined;
}) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="solid"
        borderRadius="60px"
        background="linear-gradient(90deg, #F30F21 0%, #9205FD 100%)"
        //   paddingY="12px"
        justifyContent="center"
        paddingX={responsive ? ['0', 4, '22px'] : '22px'}
        width={responsive ? ['45px', '45px', 'auto'] : 'auto'}
        color="white"
        fontSize="14px"
        h="45px"
        minWidth="unset"
        maxWidth="unset"
      >
        {isLargeScreen || !responsive ? 'Connect Wallet' : <BiLogInCircle />}
      </MenuButton>
      <MenuList zIndex={2}>
        {/* <MenuItem>Download</MenuItem> */}
        {connectors.map((connector) => (
          <MenuItem
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => {
              console.log('Connecting to: ', connector.name);
              connect({ connector });
            }}
            cursor="pointer"
            as="b"
          >
            {/* <Text as="b"> */}
            {connector.name === 'Injected' ? 'Browser Wallet' : connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
            {/* </Text> */}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ConnectWalletButton;
