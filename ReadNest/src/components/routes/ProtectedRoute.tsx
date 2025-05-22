import type { GetUserResponse } from "@/api/@types";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  user: GetUserResponse | null;
  allowedRoles?: string[];
  children: React.ReactNode;
}

export const ProtectedRoute = ({
  isAuthenticated,
  user,
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (allowedRoles && !allowedRoles.includes(user?.roleName ?? "")) {
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [allowedRoles, user]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (shouldRedirect) return <Navigate to="/not-found" replace />;
  return <>{children}</>;
};
