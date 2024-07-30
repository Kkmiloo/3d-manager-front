import { Card } from 'flowbite-react';

interface Props {
  title: string;
}

export const HeaderCard = ({ title }: Props) => {
  return (
    <div>
      <Card
        className='min-w-full'
        horizontal
        imgSrc='https://cdn.pixabay.com/photo/2022/06/08/00/55/strawberries-7249448_640.jpg'
      >
        <div className='w-full'>
          <h1>{title}</h1>
        </div>
      </Card>
    </div>
  );
};
