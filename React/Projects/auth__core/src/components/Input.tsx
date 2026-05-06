import React from 'react';
import { cn } from '../lib/utils';

type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  label?: string;
  as?: 'input' | 'select';
};

export function Input({ 
  className, 
  label, 
  type = 'text', 
  as = 'input',
  children,
  ...props 
}: InputProps) {
  const InputComponent = as as any;
  
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-bold uppercase tracking-wider text-[#1b1b1b]">
          {label}
        </label>
      )}
      <InputComponent
        type={type}
        className={cn(
          'w-full p-4 bg-white border-4 border-[#1b1b1b] font-mono text-[#1b1b1b]',
          'focus:outline-none focus:bg-[#ffe800] transition-colors',
          'placeholder:text-black/30 neo-shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </InputComponent>
    </div>
  );
}
