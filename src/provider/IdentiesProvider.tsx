import * as React from "react";
import { createIdentiesClient, type IdentiesClientConfig } from "../api/client";
import { useIdenties, type UseIdentiesReturn } from "../hooks/useIdenties";

interface IdentiesContextValue extends UseIdentiesReturn {
  client: typeof createIdentiesClient;
}

const IdentiesContext = React.createContext<IdentiesContextValue | null>(null);

export interface IdentiesProviderProps {
  children: React.ReactNode;
  config?: IdentiesClientConfig;
}

export function IdentiesProvider({ children, config }: IdentiesProviderProps) {
  // const identiesData = useIdenties(config);
  const identiesData = useIdenties(config);

  const contextValue: IdentiesContextValue = {
    ...identiesData,
    client: createIdentiesClient,
  };

  return (
    <IdentiesContext.Provider value={contextValue}>
      {children}
    </IdentiesContext.Provider>
  );
}

export function useIdentiesContext(): IdentiesContextValue {
  const context = React.useContext(IdentiesContext);
  if (!context) {
    throw new Error(
      "useIdentiesContext must be used within an IdentiesProvider"
    );
  }
  return context;
}
