import * as React from "react";
import { useAuth, AuthForm } from "@pie/components";

export const DevelopmentWrapper: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <AuthForm />;
};

export default DevelopmentWrapper;
