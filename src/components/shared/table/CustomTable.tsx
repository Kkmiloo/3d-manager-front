import { ReactNode, useEffect, useState } from 'react';

import { Checkbox, Pagination, Table } from 'flowbite-react';

interface Identifiable {
  id: string | number;
}
interface Props<T extends Identifiable> {
  data: T[];
  columns: (keyof T)[];
  itemsPerPage?: number;
  children?: string | ReactNode;
}

//https://flowbite.com/docs/components/tables/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomTable = <T extends Identifiable>({
  data,
  columns,
  itemsPerPage = 9,

  children,
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

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [dataEdit, setDataEdit] = useState(data[0]);

  const onPageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    setCurrentData(data.slice(startIndex, endIndex));
  }, [currentPage, data, startIndex, endIndex]);

  return (
    <>
      {children}

      <Table>
        <Table.Head className='bg-slate-700'>
          <Table.HeadCell className='p-4'>
            <Checkbox />
          </Table.HeadCell>
          {columns.map((column, i) => (
            <Table.HeadCell key={i}>{column as string}</Table.HeadCell>
          ))}
          <Table.HeadCell>
            <span className='sr-only'>Edit</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className='divide-y'>
          {currentData.map((row) => (
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell className='p-4'>
                <Checkbox />
              </Table.Cell>
              {columns.map((column) => (
                <Table.Cell className='p-4' key={column as string}>
                  {String(row[column])}
                </Table.Cell>
              ))}
              <Table.Cell>
                <a
                  href='#'
                  onClick={() => setShowEditModal(true)}
                  className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className='flex overflow-x-auto sm:justify-end'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
          theme={{ base: 'ss' }}
        />
      </div>
    </>
  );
};
