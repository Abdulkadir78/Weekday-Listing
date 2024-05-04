import { createTheme, responsiveFontSizes } from "@mui/material/styles";

type custom_typography = {
  s1: React.CSSProperties;
  s2: React.CSSProperties;
  s3: React.CSSProperties;
  s4: React.CSSProperties;
  s5: React.CSSProperties;
  s6: React.CSSProperties;
  b1: React.CSSProperties;
  b2: React.CSSProperties;
  b3: React.CSSProperties;
  b4: React.CSSProperties;
  b5: React.CSSProperties;
  b6: React.CSSProperties;
};
type Custom_Typography = Partial<custom_typography>;

declare module "@mui/material/styles" {
  interface TypographyVariants extends Custom_Typography {}

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions extends Custom_Typography {}
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    s1: true;
    s2: true;
    s3: true;
    s4: true;
    s5: true;
    s6: true;
    b1: true;
    b2: true;
    b3: true;
    b4: true;
    b5: true;
  }
}

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: "#4943DA" },
      secondary: { main: "#54EFC3", light: "#D9FED3" },
      text: { secondary: "#4C5969", disabled: "#8B8B8B" },
    },

    typography: {
      fontFamily: "Roboto, sans-serif",
      allVariants: {
        color: "#212121",
      },

      h1: { fontSize: 40, fontWeight: 500 },
      h2: { fontSize: 32, fontWeight: 400 },
      h3: { fontSize: 24, fontWeight: 500 },
      h4: { fontSize: 24, fontWeight: 400 },
      h5: { fontSize: 20, fontWeight: 500 },
      h6: { fontSize: 20, fontWeight: 400 },
      s1: { fontSize: 18, fontWeight: 400 },
      s2: { fontSize: 16, fontWeight: 800 },
      s3: { fontSize: 16, fontWeight: 700 },
      s4: { fontSize: 16, fontWeight: 600 },
      s5: { fontSize: 16, fontWeight: 500 },
      s6: { fontSize: 16, fontWeight: 400 },
      b1: { fontSize: 14, fontWeight: 600 },
      b2: { fontSize: 14, fontWeight: 500 },
      b3: { fontSize: 14, fontWeight: 400 },
      b4: { fontSize: 12, fontWeight: 700 },
      b5: { fontSize: 12, fontWeight: 500 },
      b6: { fontSize: 12, fontWeight: 400 },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { textTransform: "capitalize", fontSize: 16 } },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            s1: "h6",
            s2: "h6",
            s3: "h6",
            s4: "h6",
            s5: "h6",
            s6: "h6",
            b1: "p",
            b2: "p",
            b3: "p",
            b4: "p",
            b5: "p",
          },
        },
      },
    },
  })
);
