import { Button, ColorPaletteProp, Snackbar } from "@mui/joy";
import { createContext, ReactNode, useState } from "react";

type SnackbarContextProps = {
  showSnackbar: (type: ColorPaletteProp, message: string) => void;
};

type SnackbarContextProviderProps = {
  children: ReactNode;
};

export const SnackbarContext = createContext({} as SnackbarContextProps);

export const SnackbarContextProvider = ({ children }: SnackbarContextProviderProps) => {
  const [snackbar, setSnackbar] = useState<{ isOpen: boolean; type: ColorPaletteProp; message: string }>({
    isOpen: false,
    type: "neutral",
    message: ""
  });

  const showSnackbar = (type: ColorPaletteProp, message: string) => {
    setSnackbar({ isOpen: true, type, message });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, isOpen: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.isOpen}
        onClose={handleClose}
        color={snackbar.type}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
        endDecorator={
          <Button onClick={handleClose} color={snackbar.type} size="sm" variant="plain">
            Dismiss
          </Button>
        }
        sx={{ fontSize: 16 }}
      >
        {snackbar.message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
