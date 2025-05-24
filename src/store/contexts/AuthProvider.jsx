// src/context/AuthProvider.jsx
import { useEffect, useState } from "react";
import useUserStore from "../store";
import NetworkLoading from "../../components/NetworkLoading";
import { AuthContext } from "./autheContext";
import { refreshAccessToken } from "../../utils/auth-api-client";

export default function AuthProvider({ children }) {
  const { user, resetUser } = useUserStore((state) => state);
  const [loading, setLoading] = useState(false);

  // Run once on mount
  useEffect(() => {
    const refreshToken = async () => {
      try {
        setLoading(true);
        await refreshAccessToken();
      } catch (err) {
        console.error(
          "Token refresh failed:",
          err?.response?.data || err.message
        );
        resetUser();
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      refreshToken();
    }
  }, []);

  if (loading) {
    return <NetworkLoading description="Loading..." />;
  }

  return (
    <AuthContext.Provider value={(loading, setLoading)}>
      {children}
    </AuthContext.Provider>
  );
}
