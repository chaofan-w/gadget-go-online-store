import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import lighttheme from "./themes/lightTheme";
import darktheme from "./themes/darkTheme";
import GlobalStyles from "./GlobalStyle";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <Provider store={store}>
      {/* <ThemeProvider theme={darktheme}> */}
      <ThemeProvider theme={lighttheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
