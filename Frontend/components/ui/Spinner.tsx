// =====================================================
// Spinner Component - RwandaBeyond Agri-Business
// =====================================================

import React from 'react';
import { AlertTriangle, Inbox } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-3',
  lg: 'h-12 w-12 border-4',
  xl: 'h-16 w-16 border-4',
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-primary border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export function LoadingOverlay({ isLoading, children, className }: LoadingOverlayProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
}

interface LoadingStateProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function LoadingState({ text = 'Loading...', size = 'lg', className }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-muted px-6 py-8 text-center', className)}>
      <Spinner size={size} />
      <p className="max-w-md text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

interface FullPageLoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function FullPageLoading({ text = 'Loading...', size = 'lg', className }: FullPageLoadingProps) {
  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-background', className)}>
      <LoadingState text={text} size={size} className="py-0" />
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading data.',
  onRetry
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-danger/15 bg-danger/5 px-6 py-8 text-center" role="alert">
      <div className="rounded-md bg-danger/10 p-3">
        <AlertTriangle className="h-6 w-6 text-danger" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title = 'No data found',
  message = 'There is no data to display.',
  icon,
  action
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted px-6 py-6 text-center">
      {icon || (
        <div className="rounded-md bg-slate-100 dark:bg-slate-800 p-3">
          <Inbox className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
      <div>
        <h3 className="font-semibold text-sm text-foreground">{title}</h3>
        <p className="mt-1 max-w-sm text-xs text-muted-foreground">{message}</p>
      </div>
      {action}
    </div>
  );
}

export default Spinner;
