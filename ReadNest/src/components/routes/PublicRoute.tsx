import { ROUTE_PATHS } from "@/constants/routePaths";
import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  children: React.ReactNode;
}

export const PublicRoute = ({ user, children }: PublicRouteProps) => {
  if (user.isAuthenticated)
    return <Navigate to={ROUTE_PATHS.DEFAULT} replace />;
  return <>{children}</>;
};
