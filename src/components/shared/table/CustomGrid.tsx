import { Card } from 'flowbite-react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Identifiable {
  id: string | number;
  urlImg?: string;
}
interface Props<T extends Identifiable> {
  data: T[];
  columns: (keyof T)[];
  itemsPerPage?: number;
  children?: string | ReactNode;
  handleEdit?: (id: string) => void;
}

export const CustomGrid = <T extends Identifiable>({
  data,
  columns,
}: Props<T>) => {
  const navigator = useNavigate();

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12'>
      {data.map((item) => (
        <Card
          key={item.id}
          href=';'
          onClick={(e) => {
            e.preventDefault();
            navigator(`./${item.id}`);
          }}
          className='max-w-60'
          imgSrc={`${
            item.urlImg ??
            'https://cdn.pixabay.com/photo/2022/06/08/00/55/strawberries-7249448_640.jpg'
          }`}
        >
          {columns.map((row, i) => (
            <div key={i}>{String(item[row])}</div>
          ))}
        </Card>
      ))}
    </div>
  );
};
