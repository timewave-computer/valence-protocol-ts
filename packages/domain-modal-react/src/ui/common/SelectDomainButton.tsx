export const SelectDomainButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <button
        className='w-full flex flex-row justify-between items-center'
        onClick={onClick}
      >
        {children}
        <p>{'>'}</p>
      </button>
    </div>
  );
};
