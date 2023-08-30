import { createContext } from 'react';
import React from 'react';

export type ShowLoaderContextType = {
  showLoader?: boolean;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ShowLoaderContext = createContext<ShowLoaderContextType>({
  showLoader: false,
  setShowLoader: (value: React.SetStateAction<boolean>): void => {
    throw new Error('Function not implemented.');
  },
});
