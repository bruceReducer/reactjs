import { createContext, useContext } from "react";

const AuthCtx = createContext({
  user: { username: "Jackie" },
  tagline: "",
  bio: "",
});
AuthCtx.displayName = "AuthContext";

function AuthProvider({ user, ...props }) {
  return <AuthCtx.Provider {...props} value={user} />;
}

const useAuthCMF = () => useContext(AuthCtx);

export { AuthProvider, useAuthCMF };
