import React, { createContext, useContext, useState } from "react";

import Snackbar from "components/snackbar";

interface SnackbarContextData {
  showSnackbar: (params: Params) => void;
  closeSnackbar: () => void;
}

interface Params {
  image?: string;
  name?: string;
  message: string;
  cancelText: string;
  submitText: string;
  onCancel?: () => void;
  onSubmit: () => void;
}

const SnackbarContext = createContext<SnackbarContextData>(
  {} as SnackbarContextData
);

const SnackbarProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState({} as Params);

  const showSnackbar = (data: Params) => {
    setParams(data);
    setOpen(true);
  };

  const closeSnackbar = () => setOpen(false);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, closeSnackbar }}>
      <Snackbar
        open={open}
        close={closeSnackbar}
        image={params.image}
        name={params.name}
        message={params.message}
        onSubmit={params.onSubmit}
        submitText={params.submitText}
        onCancel={params?.onCancel}
        cancelText={params.cancelText}
      />
      {children}
    </SnackbarContext.Provider>
  );
};

function useSnackbar(): SnackbarContextData {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar deve ser usado com o SnackbarProvider");
  }

  return context;
}

export { SnackbarProvider, useSnackbar };
