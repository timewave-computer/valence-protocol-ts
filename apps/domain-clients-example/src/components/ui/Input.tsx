import { cn } from '@/components/ui';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        'border border-gray-300 rounded-sm p-1 font-mono text-xs max-w-[400px]',
        className
      )}
      {...props}
    />
  );
};
