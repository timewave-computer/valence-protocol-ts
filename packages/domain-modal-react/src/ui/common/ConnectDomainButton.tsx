export const ConnectDomainButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className='font-bold text-base hover:bg-gray-100 rounded-sm px-4 py-2 -mx-4'>
      <button
        className='w-full flex flex-row justify-between items-center gap-2'
        onClick={onClick}
      >
        {children}
        <p className='text-lg'>{'>'}</p>
      </button>
    </div>
  );
};
