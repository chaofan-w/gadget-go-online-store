import { createTheme } from "@mui/material/styles";

const darktheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6e5b98",
      light: "#cec2dc",
      dark: "#2b2839",
    },
    secondary: {
      main: "#844881",
      dark: "#844881",
      light: "#f3d0ea",
    },
    background: {
      default: "#1b1623",
      paper: "#34255a",
    },
    info: {
      main: "#2196f3",
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
      fontFamily: "Raleway",
      fontWeight: 700,
    },
  },
});

export default darktheme;
