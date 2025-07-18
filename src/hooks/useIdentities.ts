import { useCallback, useEffect, useState } from "react";
import type { User } from "../types/user";

export function useIdenties(apiUrl: string, token: string): User {
  // State
  const [user, setUser] = useState<User | null>(null);

  // Fetch user function
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const userData = await res.json();
        setUser(userData);
      }
    } catch (err) {
      console.log("error ", err);
    }
  }, [apiUrl, token]);

  // Auto-fetch user on mount if enabled
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return user!;
}
