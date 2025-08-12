import { cn } from '@/components/ui/';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ children, className, ...rest }: LabelProps) => {
  return (
    <label className={cn('text-xs font-medium', className)} {...rest}>
      {children}
    </label>
  );
};
