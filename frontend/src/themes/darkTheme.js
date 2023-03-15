import { createTheme } from "@mui/material/styles";

const darktheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#29232d",
      light: "#6200ea",
      dark: "#240035",
    },
    secondary: {
      main: "#aa00ff",
      dark: "#311b92",
      light: "#b388ff",
    },
    info: {
      main: "#2196f3",
    },
    background: {
      paper: "#3a363f",
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

export default darktheme;
