import { QueryClient, QueryClientProvider } from "react-query";

export const queryclient = new QueryClient();

export function ReactQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
  );
}
