import { useEffect, useState } from 'react';

interface Identifiable {
  id: string | number;
}
interface Props<T extends Identifiable> {
  data: T[];
  columns: (keyof T)[];
  itemsPerPage?: number;
}

//https://flowbite.com/docs/components/tables/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomTable = <T extends Identifiable>({
  data,
  columns,
  itemsPerPage = 9,
}: Props<T>) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  //window
  const rowHeight = 53;
  const offset = rowHeight * 4;
  const maxTableHeight = window.innerHeight - offset;
  itemsPerPage = Math.floor(maxTableHeight / rowHeight);
  //Paginate data
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [currentData, setCurrentData] = useState(
    data.slice(startIndex, endIndex)
  );
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setCurrentData(data.slice(startIndex, endIndex));
  }, [currentPage, data, startIndex, endIndex]);

  return (
    <>
      <div className='relative overflow-x-auto shadow-md sm:rounded-md w-full max-h-fit'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto'>
          <thead className='text-xs text-gray-800 uppercase bg-gray-50  '>
            <tr className='p-20 text-sm'>
              <th scope='col' className='p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-all'
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label htmlFor='checkbox-all' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </th>
              {columns.map((column) => (
                <th scope='col' className='px-6 py-3' key={column as string}>
                  {column as string}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr className='bg-white border-b  text-gray-600' key={index}>
                <td className='p-4'>
                  <div className='flex items-center'>
                    <input
                      id={`checkbox-${row.id}`}
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label htmlFor='checkbox-all' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                {columns.map((column) => (
                  <td
                    scope='row'
                    className='px-6 py-4 w-auto '
                    key={column as string}
                  >
                    {String(row[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav
        className='flex items-center flex-column flex-wrap md:flex-row justify-between pt-4'
        aria-label='Table navigation'
      >
        <span className='text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto'>
          Showing{' '}
          <span className='font-semibold text-gray-900 dark:text-white'>
            {startIndex + 1} {' - '}{' '}
            {endIndex < data.length ? endIndex : data.length}{' '}
          </span>
          of{' '}
          <span className='font-semibold text-gray-900 dark:text-white'>
            {data.length}
          </span>
        </span>
        <ul className='inline-flex -space-x-px rtl:space-x-reverse text-sm h-8'>
          <li>
            <a
              href='#'
              onClick={previousPage}
              className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              Previous
            </a>
          </li>

          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i}>
              <a
                href='#'
                onClick={() => goToPage(i + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  i === currentPage - 1
                    ? 'text-blue-700 border border-gray-300 bg-blue-100'
                    : 'text-gray-500 bg-white '
                }`}
              >
                {i + 1}
              </a>
            </li>
          ))}

          <li>
            <a
              href='#'
              onClick={nextPage}
              className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
