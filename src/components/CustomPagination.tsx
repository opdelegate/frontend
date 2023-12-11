import { FC } from 'react';
// import {
//   Pagination,
//   usePagination,
//   PaginationNext,
//   PaginationPage,
//   PaginationPrevious,
//   PaginationContainer,
//   PaginationPageGroup,
// } from '@ajna/pagination';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

const CustomPagination: FC = () => {
  //   const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
  //     initialState: { currentPage: 1, pageSize: 6 },
  //     total: 1000,
  //     limits: { inner: 1, outer: 2 },
  //   });

  return (
    // <Pagination
    //   pagesCount={pagesCount}
    //   currentPage={currentPage}
    //   onPageChange={setCurrentPage}
    // >
    //   <PaginationContainer>
    //     <PaginationPrevious
    //       minW={7}
    //       w={7}
    //       h={7}
    //       bg="white"
    //       borderRadius={0}
    //       border="1px solid #D9D9D9"
    //       fontSize="sm"
    //       fontWeight={400}
    //       p={0}
    //       mr={1}
    //     >
    //       <MdOutlineArrowBackIos />
    //     </PaginationPrevious>
    //     <PaginationPageGroup height={7}>
    //       {pages.map((page: number) => (
    //         <PaginationPage
    //           key={`pagination_page_${page}`}
    //           page={page}
    //           w={7}
    //           h={7}
    //           bg="white"
    //           borderRadius={0}
    //           border="1px solid #D9D9D9"
    //           fontSize="sm"
    //           fontWeight={400}
    //           _hover={
    //             {
    //               // bg: 'green.300',
    //             }
    //           }
    //           _current={{
    //             border: '1px solid #FF0420',
    //             color: '#FF0420',
    //           }}
    //         />
    //       ))}
    //     </PaginationPageGroup>
    //     <PaginationNext
    //       minW={7}
    //       w={7}
    //       h={7}
    //       bg="white"
    //       borderRadius={0}
    //       border="1px solid #D9D9D9"
    //       fontSize="sm"
    //       fontWeight={400}
    //       p={0}
    //       ml={1}
    //     >
    //       <MdOutlineArrowForwardIos />
    //     </PaginationNext>
    //   </PaginationContainer>
    // </Pagination>
    <></>
  );
};

export default CustomPagination;
