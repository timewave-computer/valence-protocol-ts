export const Button = ({
    children,
    ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <button className="bg-blue-500 text-white px-2 py-1 rounded-sm font-semibold hover:bg-blue-600 transition-colors duration-200" {...rest}>{children}</button>;
};