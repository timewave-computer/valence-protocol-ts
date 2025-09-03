export const NoWalletsAvailable = () => {
  return (
    <div className='flex flex-col gap-1 text-sm'>
      <p>No compatible wallet detected.</p>
      <p>Please install a compatible browser wallet to continue.</p>
    </div>
  );
};
