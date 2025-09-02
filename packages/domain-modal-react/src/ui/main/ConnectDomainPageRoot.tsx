/***
 * This is the root component for a domain page.
 * It is used to wrap the domain page and provide a consistent layout.
 * It also provides a back button to navigate back to the main page. It can be hidden if no function provided.
 *
 * @param children - The children of the domain page.
 * @param title - The title of the domain page.
 * @param onBack - The function to call when the back button is clicked.
 */
export const ConnectDomainPageRoot = ({
  children,
  title,
  onBack,
}: {
  children: React.ReactNode;
  title: string;
  onBack?: () => void;
}) => {
  return (
    <div className='flex flex-col gap-4'>
      {onBack && (
        <div className='relative'>
          <button
            className='absolute -top-2 left-0 text-base font-semibold cursor-pointer hover:bg-gray-100 rounded-sm px-1  -mx-1'
            onClick={onBack}
          >
            {'<'}
          </button>
        </div>
      )}

      <h1 className='text-xl font-bold'>{title}</h1>
      {children}
    </div>
  );
};
