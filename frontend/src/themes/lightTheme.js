import { createTheme } from "@mui/material/styles";

const lighttheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6e5b98",
      light: "#cec2dc",
      dark: "#2b2839",
    },
    secondary: {
      main: "#a9729b",
      dark: "#844881",
      light: "#f3d0ea",
    },
    background: {
      default: "rgba(255,255,255,0.8)",
      paper: "#f3f0f9",
    },
    info: {
      main: "#5a21f3",
    },
  },
  typography: {
    h1: {
      fontFamily: "Oswald",
    },
    h2: {
      fontFamily: "Oswald",
    },
    h3: {
      fontFamily: "Oswald",
    },
    caption: {
      fontFamily: "Roboto",
    },
    button: {
      fontFamily: "Lato",
    },
    body2: {
      fontFamily: "Open Sans",
    },
    body1: {
      fontFamily: "Lato",
    },
    subtitle2: {
      fontFamily: "Raleway",
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: "Raleway",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "Raleway",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "Raleway",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "Oswald",
      fontWeight: 700,
    },
  },
});

export default lighttheme;
