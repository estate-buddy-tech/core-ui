// src/context/ApiContext.js
import React, { createContext, useContext } from "react";
import { useIdenties } from "../hooks/useIdentities";
import type { User } from "../types/user";

// 1. Create the context with the service as the default value
const ApiContext = createContext<User | null>(null);

export interface IdentiesProviderProps {
  children: React.ReactNode;
  baseURL: string;
  token: string;
}

// 2. Create the Provider Component
export const ProfileProvider: React.FC<IdentiesProviderProps> = ({
  children,
  baseURL,
  token,
}) => {
  // The value provided is our imported userService object
  const identitasData = useIdenties(baseURL, token);

  return (
    <ApiContext.Provider value={identitasData}>{children}</ApiContext.Provider>
  );
};

export const useProfileContext = (): User => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error(
      "useProfileContext must be used within an IdentiesProvider"
    );
  }
  return context;
};
