"use client";

import { WaitingListProvider } from "./context/WaitingListContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <WaitingListProvider>{children}</WaitingListProvider>
    </QueryClientProvider>
  );
} 
