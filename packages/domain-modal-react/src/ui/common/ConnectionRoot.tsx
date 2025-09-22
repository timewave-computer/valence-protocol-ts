import { ReactNode } from 'react';

export const ConnectionRoot = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <h2 className='text-base font-bold'>{title}</h2>
      {children}
    </div>
  );
};
