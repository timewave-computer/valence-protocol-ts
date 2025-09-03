import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'px-2 py-1 rounded-sm font-semibold transition-colors duration-200 border outline-none rounded-xs border text-sm ',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 text-white hover:bg-gray-900/80  cursor-pointer',
        secondary: 'border-gray-700 hover:bg-gray-100 cursor-pointer',
        ghost:
          'bg-gray-200 hover:bg-gray-300 cursor-pointer border-transparent',
        disabled:
          'border-gray-300 cursor-not-allowed text-gray-900 bg-gray-300',
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
  if (disabled) {
    variant = 'disabled';
  }
  return (
    <button
      className={buttonVariants({ variant, className })}
      disabled={disabled ?? false}
      {...rest}
    >
      {children}
    </button>
  );
};
