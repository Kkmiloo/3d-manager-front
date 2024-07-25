interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

export const NavTable = ({
  currentPage,
  onPageChange,
  totalPages,
  itemsPerPage,
}: Props) => {
  return (
    <nav
      className='flex items-center flex-column flex-wrap md:flex-row justify-between pt-4'
      aria-label='Table navigation'
    >
      <span className='text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto'>
        Showing{' '}
        <span className='font-semibold text-gray-900 dark:text-white'>
          {' - '}{' '}
        </span>
        of{' '}
        <span className='font-semibold text-gray-900 dark:text-white'>
          {itemsPerPage}
        </span>
      </span>
      <ul className='inline-flex -space-x-px rtl:space-x-reverse text-sm h-8'>
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled
            className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            Previous
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button
              onClick={() => onPageChange(i + 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                i === currentPage - 1
                  ? 'text-blue-700 border border-gray-300 bg-blue-100'
                  : 'text-gray-500 bg-white '
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
