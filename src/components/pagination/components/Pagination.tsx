import React, { FC } from 'react';

// lib
import { INITIAL_VALUES } from '../constants';
import { PaginationProvider } from '../providers/PaginationProvider';

export type PaginationProps = {
  children?: React.ReactElement;
  pagesCount: number;
  isDisabled?: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  children,
  pagesCount,
  isDisabled = INITIAL_VALUES.isDisabled,
  currentPage = INITIAL_VALUES.currentPage,
  onPageChange,
}) => (
  <PaginationProvider
    currentPage={currentPage}
    isDisabled={isDisabled}
    pagesCount={pagesCount}
    onPageChange={onPageChange}
  >
    {children}
  </PaginationProvider>
);
