import clsx from 'clsx';

function getClassName({ className }) {
    return clsx(
        "text-white p-4 rounded-full ",
        className
    )
}

const sizes = {
    small: 'px-4 py-3 w-[150px] h-[50px]',
    medium: 'px-6 py-4 w-[200px]',
    large: 'w-full px-4 py-3',
}

const variants = {
    primary: 'bg-gold',
    dark: 'bg-black',
}

const Button = ({
    children, className, size='medium', variant='dark', ...rest
}) => {
    return (
        <button className={clsx(
            sizes[size],
            variants[variant],
            getClassName({ className })
        )}
        {...rest}
        >{children}</button>
    )
}

export default Button;