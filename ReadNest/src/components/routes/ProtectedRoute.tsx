import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user: { role: string } | null;
  allowedRoles?: string[];
  children: React.ReactNode;
}

export const ProtectedRoute = ({
  user,
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
