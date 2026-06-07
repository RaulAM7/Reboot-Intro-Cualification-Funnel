import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type RebootButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'ghost' | 'secondary';
    fullWidth?: boolean;
  }
>;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function RebootButton({
  children,
  className,
  fullWidth = false,
  type = 'button',
  variant = 'primary',
  ...props
}: RebootButtonProps) {
  return (
    <button
      className={cx(
        'inline-flex min-h-14 items-center justify-center rounded-[4px] border-2 px-6 pb-1 text-center text-lg font-bold leading-[0.85] tracking-tight transition-colors duration-150 md:min-w-[142px] md:text-xl lg:text-2xl',
        variant === 'primary' && 'border-primary bg-primary text-black hover:bg-transparent hover:text-primary',
        variant === 'secondary' && 'border-secondary bg-secondary text-white hover:bg-transparent hover:text-secondary',
        variant === 'ghost' && 'border-primary bg-transparent text-primary hover:bg-primary hover:text-black',
        fullWidth && 'w-full',
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

