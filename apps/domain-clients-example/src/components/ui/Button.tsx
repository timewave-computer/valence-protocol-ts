import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'px-2 py-1 rounded-sm font-semibold transition-colors duration-200 border outline-none rounded-xs border cursor-pointer text-sm ',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 text-white hover:bg-gray-700',
        secondary: 'border-gray-700 hover:bg-gray-100',
      },
      isDisabled: {
        true: 'cursor-not-allowed bg-gray-300 hover:bg-gray-300',
      },
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = ({
  children,
  className,
  disabled,
  variant = 'default',
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ variant, isDisabled: disabled, className })}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
