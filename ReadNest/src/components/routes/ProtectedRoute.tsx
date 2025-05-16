import type { GetUserResponse } from "@/api/@types";
import React from "react";
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
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  setTimeout(() => {
    if (allowedRoles && !allowedRoles.includes(user?.roleName ?? "")) {
      return <Navigate to="/unauthorized" replace />;
    }
  }, 1000);
  return <>{children}</>;
};
