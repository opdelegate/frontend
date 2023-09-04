import { configureChains, mainnet, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
  //alchemyProvider({ apiKey: 'yourAlchemyApiKey' })
);

// Set up wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '91ba35991c8a3d8be06abad51e808526',
      },
    }),
    // new MetaMaskConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
});

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet],
//   [publicProvider()],
// )

// const config = createConfig({
//   autoConnect: true,
//   publicClient,
//   webSocketPublicClient,
// })

export default wagmiConfig;
