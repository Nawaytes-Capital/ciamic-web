// PrivateRoute.tsx
import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';

// Define the type for the dynamic props
type PrivateRouteProps = {
  isAuthenticated: boolean;
} & RouteProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    // @ts-ignore
    <Navigate to="/login" replace state={{ from: props.location }} />
  );
};

export default PrivateRoute;
