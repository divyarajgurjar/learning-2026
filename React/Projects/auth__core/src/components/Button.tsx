import React from 'react';
import { cn } from '../lib/utils';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children,
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-[#ffe800] text-[#1b1b1b] border-4 border-[#1b1b1b]',
    secondary: 'bg-[#ffffff] text-[#1b1b1b] border-4 border-[#1b1b1b]',
    danger: 'bg-[#FF3366] text-white border-4 border-[#1b1b1b]',
    ghost: 'bg-transparent text-[#1b1b1b] hover:bg-black/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-xl font-bold uppercase italic',
    xl: 'px-10 py-5 text-2xl font-bold uppercase italic',
  };

  return (
    <button
      className={cn(
        'neo-shadow-interactive cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
