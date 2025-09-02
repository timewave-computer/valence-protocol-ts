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
    <div className='flex flex-col gap-4 relative'>
      {onBack && (
        <button
          className='absolute -top-6 left-0 text-xs font-semibold cursor-pointer hover:bg-gray-100 rounded-sm px-2 py-1 -mx-2'
          onClick={onBack}
        >
          Back
        </button>
      )}
      <h1 className='text-xl font-bold'>{title}</h1>
      {children}
    </div>
  );
};
