import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-lg active:scale-[0.98] cursor-pointer';

    const variants = {
      primary: 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-950/30 focus:ring-orange-500 border border-orange-500',
      secondary: 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 border border-neutral-700 focus:ring-neutral-500 shadow-sm',
      outline: 'bg-transparent text-neutral-200 hover:bg-neutral-800 border border-neutral-700 hover:border-orange-500/60 focus:ring-orange-400',
      ghost: 'bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white focus:ring-neutral-500',
      danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-950/30 focus:ring-rose-500 border border-rose-600',
      success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-950/30 focus:ring-emerald-500 border border-emerald-600',
      glow: 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-950/30 focus:ring-orange-500 border border-orange-500'
    };

    const sizes = {
      sm: 'text-xs px-2.5 py-1.5 gap-1.5',
      md: 'text-sm px-3.5 py-2 gap-2',
      lg: 'text-base px-5 py-2.5 gap-2.5',
      icon: 'p-2'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
