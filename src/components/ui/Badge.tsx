import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  withDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  withDot = false,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors whitespace-nowrap';

  const variants = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700/80',
    primary: 'bg-blue-950/70 text-blue-300 border border-blue-800/60',
    success: 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60',
    warning: 'bg-amber-950/70 text-amber-300 border border-amber-800/60',
    danger: 'bg-rose-950/70 text-rose-300 border border-rose-800/60',
    purple: 'bg-purple-950/70 text-purple-300 border border-purple-800/60',
    neutral: 'bg-slate-900/90 text-slate-400 border border-slate-800',
    outline: 'bg-transparent text-slate-300 border border-slate-700'
  };

  const dotColors = {
    default: 'bg-slate-400',
    primary: 'bg-blue-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    danger: 'bg-rose-400',
    purple: 'bg-purple-400',
    neutral: 'bg-slate-500',
    outline: 'bg-slate-400'
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5'
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {withDot && (
        <span className={cn('w-1.5 h-1.5 rounded-full inline-block shrink-0', dotColors[variant])} />
      )}
      {children}
    </span>
  );
};
