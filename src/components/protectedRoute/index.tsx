import React, { FunctionComponent, ReactElement, useEffect } from "react";
import { host } from "config/contants";
import { Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  element: ReactElement;
  path: string;
}

const ProtectedRoute: FunctionComponent<Props> = ({ element, path }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      window.location.href = host;
    }
  }, [user]);

  if (user) {
    return <Route path={path} element={element} />;
  } else {
    return null;
  }
};

export default ProtectedRoute;
