import { ApolloClient, InMemoryCache, createHttpLink, from, ApolloLink, WatchQueryFetchPolicy } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

const httpLink = createHttpLink({
  uri: 'https://horizon-api.www.lookfantastic.com/graphql',
  credentials: 'omit',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request timing information
const timingLink = new ApolloLink((operation, forward) => {
  const startTime = Date.now();
  return forward(operation).map(response => {
    const endTime = Date.now();
    const requestTime = endTime - startTime;
    console.log(`Request timing for ${operation.operationName}: ${requestTime}ms`);
    return response;
  });
});

// Retry link for failed requests
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 3000,
    jitter: true
  },
  attempts: {
    max: 5,
    retryIf: (error, operation) => {
      const isNetworkError = !error.result && !!error.networkError;
      const isTimeout = error.networkError?.message?.includes('timeout');
      const shouldRetry = isNetworkError || isTimeout;
      
      if (shouldRetry) {
        console.log(`Retrying operation ${operation.operationName} due to ${isTimeout ? 'timeout' : 'network error'}`);
      }
      
      return shouldRetry;
    }
  }
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        '\nExtensions:', extensions
      );
    });
  }
  if (networkError) {
    console.error('[Network error]:', networkError);
    console.error('Operation:', operation);
    // Log request details
    console.error('Request headers:', operation.getContext().headers);
    console.error('Request variables:', operation.variables);
    
    // Additional timeout and network error diagnostics
    if (networkError.message?.includes('timeout')) {
      console.error('[Timeout Error] Request exceeded timeout limit');
      console.error('Timeout setting:', operation.getContext().fetchOptions?.timeout);
    }
    if (networkError.name === 'TypeError' && networkError.message?.includes('Network')) {
      console.error('[Network Connection Error] Failed to reach proxy server');
      console.error('Target URL:', operation.getContext().uri);
    }
  }
  return forward(operation);
});

// Middleware link for logging
const middlewareLink = new ApolloLink((operation, forward) => {
  // Log the request
  console.log(`[GraphQL Request] ${operation.operationName}:`, {
    variables: operation.variables,
    query: operation.query
  });

  return forward(operation).map(response => {
    // Log the response
    console.log(`[GraphQL Response] ${operation.operationName}:`, response);
    return response;
  });
});

export const client = new ApolloClient({
  link: from([errorLink, retryLink, timingLink, middlewareLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
