export const ConnectDomainButtonRoot = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className='w-full flex flex-row justify-between items-center gap-2 font-bold text-base bg-[var(--modal-button-background)] hover:bg-[var(--modal-button-background-hover)]  text-[var(--modal-foreground)]  rounded-sm px-4 py-2'
      onClick={onClick}
    >
      {children}
      <p className='text-lg'>{'>'}</p>
    </button>
  );
};
