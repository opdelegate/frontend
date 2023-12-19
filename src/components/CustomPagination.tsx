import { FC, useEffect } from 'react';
import { Pagination } from './pagination/components/Pagination';
import { PaginationContainer } from './pagination/components/PaginationContainer';
import { PaginationPageGroup } from './pagination/components/PaginationPageGroup';
import { PaginationPage } from './pagination/components/PaginationPage';
import { PaginationNext } from './pagination/components/PaginationNext';
import { PaginationPrevious } from './pagination/components/PaginationPrevious';
import { usePagination } from './pagination/hooks/usePagination';

import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

const CustomPagination = ({
  total,
  pageSize,
  onPageChange,
}: {
  total: number;
  pageSize: number;
  onPageChange: (a: number) => void;
}) => {
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    initialState: { currentPage: 1, pageSize },
    total,
    limits: { inner: 1, outer: 2 },
  });

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      <PaginationContainer>
        <PaginationPrevious
          minW={7}
          w={7}
          h={7}
          bg="white"
          borderRadius={0}
          border="1px solid #D9D9D9"
          fontSize="sm"
          fontWeight={400}
          p={0}
          mr={1}
        >
          <MdOutlineArrowBackIos />
        </PaginationPrevious>
        <PaginationPageGroup height={7}>
          {pages.map((page: number) => (
            <PaginationPage
              key={`pagination_page_${page}`}
              page={page}
              w={7}
              h={7}
              bg="white"
              borderRadius={0}
              border="1px solid #D9D9D9"
              fontSize="sm"
              fontWeight={400}
              _hover={
                {
                  // bg: 'green.300',
                }
              }
              _current={{
                border: '1px solid #FF0420',
                color: '#FF0420',
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext
          minW={7}
          w={7}
          h={7}
          bg="white"
          borderRadius={0}
          border="1px solid #D9D9D9"
          fontSize="sm"
          fontWeight={400}
          p={0}
          ml={1}
        >
          <MdOutlineArrowForwardIos />
        </PaginationNext>
      </PaginationContainer>
    </Pagination>
  );
};

export default CustomPagination;
