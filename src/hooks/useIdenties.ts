import { useState, useEffect, useCallback } from "react";
import { createIdentiesClient, type IdentiesClientConfig } from "../api/client";
import type { User, UserUpdate, ApiError } from "../types/user";

export interface UseIdentiesConfig extends IdentiesClientConfig {
  autoFetchUser?: boolean;
}

export interface UseIdentiesReturn {
  // Client instance
  client: typeof createIdentiesClient;

  // User state
  user: User | null;
  loading: boolean;
  error: ApiError | null;

  // User actions
  fetchUser: () => Promise<void>;
  updateUser: (userUpdate: UserUpdate) => Promise<void>;
}

export function useIdenties(config: UseIdentiesConfig = {}): UseIdentiesReturn {
  const { autoFetchUser = true, token, ...clientConfig } = config;

  // Create client instance
  const client: any = createIdentiesClient(clientConfig);

  // State
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  // Fetch user function
  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const userData = await client.getCurrentUser(token!);
      setUser(userData);
    } catch (err) {
      setError(err as ApiError);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [client, token]);

  // Update user function
  const updateUser = useCallback(
    async (userUpdate: UserUpdate) => {
      setLoading(true);
      setError(null);

      try {
        const updatedUser = await client.updateUser(userUpdate, token!);
        setUser(updatedUser);
      } catch (err) {
        setError(err as ApiError);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [client]
  );

  // Auto-fetch user on mount if enabled
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [autoFetchUser, token]);

  return {
    client,
    user,
    loading,
    fetchUser,
    error,
    updateUser,
  };
}
