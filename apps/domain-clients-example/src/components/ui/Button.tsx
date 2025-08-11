import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'px-2 py-1 rounded-sm font-semibold  transition-colors duration-200 border-2',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary:
          'bg-transparent text-blue-500 border-blue-500 hover:bg-blue-500/10 ',
      },
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = ({
  children,
  className,
  variant = 'default',
  ...rest
}: ButtonProps) => {
  return (
    <button className={buttonVariants({ variant, className })} {...rest}>
      {children}
    </button>
  );
};
