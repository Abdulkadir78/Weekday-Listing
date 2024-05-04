import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: "#1876D1" },
      secondary: { main: "#54EFC3" },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { textTransform: "capitalize" } },
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  })
);
