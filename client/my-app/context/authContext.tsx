import React, { createContext, useContext, useState } from "react";

interface ContextType {
  isAuthenticated: boolean;
  handleLogin: () => void;
}

export const AuthContext = createContext<ContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth=()=>{
  const context=useContext(AuthContext);
  if (context===undefined){
    throw new Error("jhyt")
  }
  return context;
}
