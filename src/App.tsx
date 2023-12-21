import React, { useEffect, useState } from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import theme from './themes';
import Navbar from './components/Navbar';
import { UserContext } from './contexts/UserContext';
import { User } from './types/userTypes';
import {
  getItemFromLocalStorage,
  LOCALSTORAGE_OBJECTS_NAMES,
} from './utils/localStorageFunctions';
import Dashboard from './components/Dashboard';
import { ShowLoaderContext } from './contexts/ShowLoaderContext';
import Loader from './components/Loader';
import LandingPage from './components/LandingPage';

import { WagmiConfig } from 'wagmi';
import wagmiConfig from './wagmiConfig';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export enum GLOBAL_ROUTES {
  ROOT = '/',
}

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    const u = getItemFromLocalStorage(LOCALSTORAGE_OBJECTS_NAMES.USER);
    if (u) {
      console.log('USER FROM APP COMPONENT', u);
      setUser(u as User);
    }
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <ChakraProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser }}>
          <ShowLoaderContext.Provider value={{ showLoader, setShowLoader }}>
            <Router>
              <Navbar />
              <Box
                className="global-font-face"
                backgroundColor="#F7F8FC"
                overflowY="auto"
                w="100%"
                height="calc(100vh - 66px)"
              >
                {/* {user && <Dashboard />}
              {!user && <LandingPage />} */}

                <Routes>
                  {!user && (
                    <>
                      <Route
                        path={GLOBAL_ROUTES.ROOT}
                        element={<LandingPage />}
                      />
                      <Route
                        path={`${GLOBAL_ROUTES.ROOT}:param`}
                        element={<Dashboard />}
                      />
                    </>
                  )}
                  {user && (
                    <>
                      <Route
                        path={`${GLOBAL_ROUTES.ROOT}:param`}
                        element={<Dashboard />}
                      />
                      <Route
                        path={GLOBAL_ROUTES.ROOT}
                        element={<Dashboard />}
                      />
                    </>
                  )}
                </Routes>
              </Box>
            </Router>
            {showLoader && <Loader />}
          </ShowLoaderContext.Provider>
        </UserContext.Provider>
      </ChakraProvider>{' '}
    </WagmiConfig>
  );
}

export default App;
