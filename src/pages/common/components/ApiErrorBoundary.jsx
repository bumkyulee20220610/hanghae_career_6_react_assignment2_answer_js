import { Button } from '@/components/ui/button';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

const ApiErrorFallback = ({ error, resetErrorBoundary }) => {
  if (!(error instanceof Error) && !(error.name === 'FetchError')) {
    throw error;
  }

  return (
    <Button variant="default" onClick={resetErrorBoundary}>
      다시시도
      <RefreshCw className="ml-2 h-4 w-4" />
    </Button>
  );
};

const ApiErrorBoundary = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  const key = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={ApiErrorFallback}
      onReset={reset}
      resetKeys={[key]}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ApiErrorBoundary;