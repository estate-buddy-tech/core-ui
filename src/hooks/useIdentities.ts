// import { useCallback, useEffect, useState } from "react";
// import type { User } from "../types/user";

// export function useIdenties(apiUrl: string, token: string): User {
//   // State
//   const [user, setUser] = useState<User | null>(null);

//   // Fetch user function
//   const fetchUser = useCallback(async () => {
//     try {
//       const res = await fetch(`${apiUrl}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.status === 200) {
//         const userData = await res.json();
//         setUser(userData);
//       }
//     } catch (err) {
//       console.log("error ", err);
//     }
//   }, [apiUrl, token]);

//   // Auto-fetch user on mount if enabled
//   useEffect(() => {
//     fetchUser();
//   }, [fetchUser]);

//   return user!;
// }

import React from "react";
import type { ApiContextType } from "../provider/ProfileProvider";
import type { User } from "../types/user";

// Make sure your hook returns the correct shape
export const useIdenties = (baseURL: string, token: string): ApiContextType => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchUser = React.useCallback(async () => {
    if (!baseURL || !token) {
      setError("Base URL or token is missing");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${baseURL}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const userData = await res.json();
        setUser(userData);
      } else {
        setError(`Failed to fetch user: ${res.status}`);
      }
    } catch (error) {
      setError(
        `Network error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  }, [baseURL, token]);

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
  };
};
