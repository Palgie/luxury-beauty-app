import { useCallback } from 'react';

interface UseApiStateProps {
  loading: boolean;
  error?: Error | { message: string };
  data?: any;
}

export function useApiState({ loading, error, data }: UseApiStateProps) {
  const renderLoading = useCallback((children: React.ReactNode) => {
    if (loading) {
      return children;
    }
    return null;
  }, [loading]);

  const renderError = useCallback((children: React.ReactNode) => {
    if (error) {
      return children;
    }
    return null;
  }, [error]);

  const renderContent = useCallback((children: React.ReactNode) => {
    if (!loading && !error && data) {
      return children;
    }
    return null;
  }, [loading, error, data]);

  return {
    isLoading: loading,
    isError: !!error,
    error,
    data,
    renderLoading,
    renderError,
    renderContent,
  };
}
