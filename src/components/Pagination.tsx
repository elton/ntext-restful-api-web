import { Show, type Component } from 'solid-js'

// 是否预渲染,如果是SSR则为false,如果是CSR则为true
export const prerender = true

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  paginationNumbers: number[]
  onPageChange: (page: number) => void
  prevPage: () => void
  nextPage: () => void
}

const Pagination: Component<PaginationProps> = (props) => {
  return (
    <nav
      class='flex items-center flex-column flex-wrap md:flex-row justify-between pt-4'
      aria-label='Table navigation'>
      <span class='text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto'>
        Showing{' '}
        <span class='font-semibold text-gray-900 dark:text-white'>
          {(props.currentPage - 1) * props.pageSize + 1}-
          {props.currentPage * props.pageSize > props.totalPages
            ? props.totalPages
            : props.currentPage * props.pageSize}
        </span>{' '}
        of{' '}
        <span class='font-semibold text-gray-900 dark:text-white'>
          {props.totalPages}
        </span>
      </span>
      <ul class='inline-flex -space-x-px text-sm h-8'>
        <li>
          <button
            class='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:(bg-gray-100 text-gray-700) dark:(bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white)'
            onClick={props.prevPage}
            disabled={props.currentPage === 1}>
            Previous
          </button>
        </li>
        <Show when={props.paginationNumbers.length > 0} fallback={<></>}>
          {props.paginationNumbers.map((item) => (
            <li>
              <a
                href='#'
                onClick={() => props.onPageChange(item)}
                class={`flex items-center justify-center px-3 h-8 leading-tight ${
                  item === props.currentPage
                    ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:(bg-blue-100 text-blue-700) dark:(border-gray-700 bg-gray-700 text-white)'
                    : 'ms-0 text-gray-500 bg-white border border-gray-300 hover:(bg-gray-100 text-gray-700) dark:(bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white)'
                }`}>
                {item}
              </a>
            </li>
          ))}
        </Show>
        <li>
          <button
            class='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            onClick={props.nextPage}
            disabled={props.currentPage * props.pageSize >= props.totalPages}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
