import { useEffect, useState } from "react";
import { getMe } from "../services/auth.api";
import { AuthContext } from "./CreateAuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setLoading(true);
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        setUser(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
