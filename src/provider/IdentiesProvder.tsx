import { createContext, useContext, type ReactNode } from "react";
import { createIdentiesClient, type IdentiesClientConfig } from "../api/client";
import { useIdenties, type UseIdentiesReturn } from "../hooks/useIdenties";

interface IdentiesContextValue extends UseIdentiesReturn {
  client: typeof createIdentiesClient;
}

const IdentiesContext = createContext<IdentiesContextValue | null>(null);

export interface IdentiesProviderProps {
  children: ReactNode;
  config?: IdentiesClientConfig;
}

export function IdentiesProvider({ children, config }: IdentiesProviderProps) {
  const identiesData = useIdenties(config);

  return (
    <IdentiesContext.Provider value={identiesData}>
      {children}
    </IdentiesContext.Provider>
  );
}

export function useIdentiesContext(): IdentiesContextValue {
  const context = useContext(IdentiesContext);
  if (!context) {
    throw new Error(
      "useIdentiesContext must be used within an IdentiesProvider"
    );
  }
  return context;
}
