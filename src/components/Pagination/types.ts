export declare type PaginationProps = {
  currentPage: number
  totalPages: number
  pageSize: number
  paginationNumbers: number[]
  onPageChange: (page: number) => void
  prevPage: () => void
  nextPage: () => void
}
