import { ReactNode, useEffect, useState } from 'react';

import { Checkbox, Pagination, Table } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

interface Identifiable {
  id: string | number;
}

interface Column<T> {
  key: keyof T;
  label: string;
}

interface Props<T extends Identifiable> {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  children?: string | ReactNode;
  handleEdit?: (id: string) => void;
  redirectTo?: boolean;
}

//https://flowbite.com/docs/components/tables/

const rowHeight = 53;
const offset = rowHeight * 4;
const maxTableHeight = window.innerHeight - offset;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomTable = <T extends Identifiable>({
  data,
  columns,
  itemsPerPage = 9,
  redirectTo,
  handleEdit,
}: Props<T>) => {
  const totalPages = Math.floor(data.length / itemsPerPage);

  //window
  itemsPerPage = Math.floor(maxTableHeight / rowHeight);

  //Paginate data
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [currentData, setCurrentData] = useState(
    data.slice(startIndex, endIndex)
  );

  const navigate = useNavigate();

  const onPageChange = (page: number) => setCurrentPage(page);

  const handleRedirect = (id: string | number) => {
    navigate(`./${id}`);
  };

  useEffect(() => {
    setCurrentData(data.slice(startIndex, endIndex));
  }, [currentPage, data, startIndex, endIndex]);

  return (
    <div className='overflow-auto '>
      <Table>
        <Table.Head className='bg-slate-700'>
          <Table.HeadCell className='p-4'>
            <Checkbox />
          </Table.HeadCell>
          {columns.map((column, i) => (
            <Table.HeadCell key={i}>{column.label}</Table.HeadCell>
          ))}
          {handleEdit && (
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          )}
        </Table.Head>

        <Table.Body className='divide-y'>
          {currentData.map((row) => (
            <Table.Row
              key={row.id}
              onClick={() => redirectTo && handleRedirect(row.id)}
              className={`${
                redirectTo ? 'hover:bg-gray-100 cursor-pointer' : ''
              } bg-white dark:border-gray-700 dark:bg-gray-800`}
            >
              <Table.Cell className='p-4 w-2'>
                <Checkbox />
              </Table.Cell>
              {columns.map((column) => (
                <Table.Cell
                  className={`${row.id == row[column.key] ? 'w-2' : ''} p-4`}
                  key={column.key as string}
                >
                  {String(row[column.key])}
                </Table.Cell>
              ))}
              {handleEdit && (
                <Table.Cell>
                  <a
                    href='#'
                    onClick={() => {
                      handleEdit(row.id as string);
                    }}
                    className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                  >
                    Edit
                  </a>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className='flex overflow-x-auto sm:justify-end'>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        )}
      </div>
    </div>
  );
};
