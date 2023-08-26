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

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const u = getItemFromLocalStorage(LOCALSTORAGE_OBJECTS_NAMES.USER);
    if (u) {
      console.log('USER FROM APP COMPONENT', u);
      setUser(u as User);
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Box
          backgroundColor="#F7F8FC"
          overflowY="auto"
          w="100%"
          height="calc(100vh - 78px)"
        >
          {user && <Dashboard />}
          {!user && 'lading page'}
        </Box>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
