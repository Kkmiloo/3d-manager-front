import { Label, TextInput } from 'flowbite-react';

export const Calculator = () => {
  return (
    <div className='flex flex-col'>
      <div>
        <Label> Consumo Wh Impresora </Label>
        <TextInput />
      </div>
    </div>
  );
};
