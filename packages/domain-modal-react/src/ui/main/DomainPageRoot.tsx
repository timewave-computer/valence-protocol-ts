/***
 * This is the root component for a domain page.
 * It is used to wrap the domain page and provide a consistent layout.
 * It also provides a back button to navigate back to the main page. It can be hidden if no function provided.
 *
 * @param children - The children of the domain page.
 * @param title - The title of the domain page.
 * @param onBack - The function to call when the back button is clicked.
 */
export const DomainPageRoot = ({
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
      {onBack && <button onClick={onBack}>Back</button>}
      <h1 className='text-2xl font-bold'>{title}</h1>
      {children}
    </div>
  );
};
