import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'px-2 py-1 rounded-sm font-semibold transition-colors duration-200 border outline-none rounded-xs border cursor-pointer text-sm ',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 text-white hover:bg-gray-700',
        secondary: 'border-gray-700 hover:bg-gray-100',
        disabled: 'border-gray-500 cursor-not-allowed text-white bg-gray-500',
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
