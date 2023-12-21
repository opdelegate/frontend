import { TopDelegatesTable } from "./TopDelegatesTable";
import { Delegates } from '../types/dataTypes';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getTopDelegates } from '../services/opDelegates';
import { Box, Stack } from '@chakra-ui/react';
import {
    ShowLoaderContext,
    ShowLoaderContextType,
  } from '../contexts/ShowLoaderContext';
// import { useContext } from 'react';
// import { UserContext } from '../contexts/UserContext';
// import { UserContextType } from '../types/userTypes';

const tableHeaders = ['Delegate', 'Votable Supply', 'Votable Supply(%)'];
function topDelegates() {
    const { setShowLoader }: ShowLoaderContextType = useContext(ShowLoaderContext);
    const [topDelegates, setTopDelegates] = useState<Delegates[]>([]);

    const fetchData = useCallback(async () => {
        setShowLoader(true);
        try {
          const topDelegatesResponse = await getTopDelegates();
          setTopDelegates(topDelegatesResponse.data.slice(0, -1) || []);
        } catch (error) {
          setTopDelegates([]);
          console.error(error);
        } finally {
            setShowLoader(false);
        }
      }, [setShowLoader]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Box px={[4, 4, 12, 20]}>
          <Stack
            py={6}
          ></Stack>
            <TopDelegatesTable               
              label="Top delegates"
              headers={tableHeaders} 
              data={topDelegates}
              pageSize={10} 
              connectWalletAddress={'0x1b686ee8e31c5959d9f5bbd8122a58682788eead'}
            />
        </Box>
    );
}

export default topDelegates;