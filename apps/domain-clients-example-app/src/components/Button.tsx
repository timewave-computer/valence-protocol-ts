

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({
    children,
    onClick,
}: ButtonProps) => {
    return <button className="bg-blue-500 text-white px-2 py-1 rounded-sm font-semibold hover:bg-blue-600 transition-colors duration-200" onClick={onClick}>{children}</button>;
};