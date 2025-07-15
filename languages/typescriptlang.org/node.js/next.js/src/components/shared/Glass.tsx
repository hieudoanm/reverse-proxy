import { FC, ReactNode, ButtonHTMLAttributes } from 'react';

export const Button: FC<
  {
    children: ReactNode;
    className?: string;
  } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ type = 'button', children, className = '', disabled, ...props }) => {
  const baseClasses = `
    inline-flex items-center justify-center
    rounded-full px-6 py-2
    font-semibold text-white
    bg-white/10
    border border-white/20
    backdrop-blur-lg
    shadow-lg shadow-black/30
    transition duration-300
    hover:bg-white/20
    focus:outline-none focus:ring-2 focus:ring-white/30
  `;

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button type={type} disabled={disabled} className={`${baseClasses} ${disabledClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card: FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => {
  const baseClasses = `
    relative overflow-hidden rounded-2xl
    border border-white/10
    bg-white/5
    backdrop-blur-lg
    shadow-xl shadow-black/30
    p-6 sm:p-8
    transition-all duration-300
  `;

  return <div className={`${baseClasses} ${className}`}>{children}</div>;
};

export const Glass = { Button, Card };
