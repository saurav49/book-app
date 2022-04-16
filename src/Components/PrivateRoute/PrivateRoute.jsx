import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ path }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate state={{ from: path }} replace to="/" />
      )}
    </div>
  );
};

export { PrivateRoute };
