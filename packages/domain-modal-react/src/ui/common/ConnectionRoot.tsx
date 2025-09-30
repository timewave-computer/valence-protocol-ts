import { ReactNode } from 'react';

export const ConnectionRoot = ({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) => {
  return (
    <div>
      {title && (
        <h2 className='text-base font-bold text-[var(--modal-foreground)]'>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};
