export const Label = ({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor: string;
}) => {
  return (
    <label className='text-xs font-medium' htmlFor={htmlFor}>
      {children}
    </label>
  );
};
