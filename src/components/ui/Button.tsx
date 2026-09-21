import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-lg active:scale-[0.98] cursor-pointer';

    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-900/30 focus:ring-blue-500 border border-blue-500/30',
      secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700/80 focus:ring-slate-500 shadow-sm',
      outline: 'bg-transparent text-slate-200 hover:bg-slate-800/80 border border-slate-700 hover:border-slate-600 focus:ring-slate-400',
      ghost: 'bg-transparent text-slate-300 hover:bg-slate-800/60 hover:text-white focus:ring-slate-500',
      danger: 'bg-rose-600/90 text-white hover:bg-rose-600 shadow-md shadow-rose-900/30 focus:ring-rose-500 border border-rose-500/40',
      success: 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-900/30 focus:ring-emerald-500 border border-emerald-500/40',
      glow: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 border border-blue-400/30'
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
