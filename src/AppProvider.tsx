import React from "react";

import { SnackbarProvider } from "./hooks/useSnackbar";
import { AuthProvider } from "./hooks/useAuth";

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </AuthProvider>
  );
};

export default AppProvider;
