import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'white' | 'yellow' | 'hazard';
}

export function Card({ children, className, variant = 'white' }: CardProps) {
  const variants = {
    white: 'bg-white',
    yellow: 'bg-[#ffe800]',
    hazard: 'hazard-stripe',
  };

  return (
    <div className={cn(
      'border-4 border-[#1b1b1b] neo-shadow p-6',
      variants[variant],
      className
    )}>
      {children}
    </div>
  );
}
