import React, { use } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user: { roleName: string } | null;
  allowedRoles?: string[];
  children: React.ReactNode;
}

export const ProtectedRoute = ({
  user,
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  if (!user?.roleName) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.roleName)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
