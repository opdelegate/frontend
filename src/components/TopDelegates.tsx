import { TopDelegatesTable } from "./TopDelegatesTable";
import { Delegates } from '../types/dataTypes';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getTopDelegates } from '../services/opDelegates';
import { Box, Stack } from '@chakra-ui/react';
import {
    ShowLoaderContext,
    ShowLoaderContextType,
  } from '../contexts/ShowLoaderContext';

const tableHeaders = ['Delegates', 'Voteable supply', 'Vote Supply(%)'];
function topDelegates() {
    const { setShowLoader }: ShowLoaderContextType = useContext(ShowLoaderContext);
    const [topDelegates, setTopDelegates] = useState<Delegates[]>([]);

    const fetchData = useCallback(async () => {
        setShowLoader(true);
        try {
          const topDelegatesResponse = await getTopDelegates();
          setTopDelegates(topDelegatesResponse.data || []);
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
              pageSize={10} />
        </Box>
    );
}

export default topDelegates;