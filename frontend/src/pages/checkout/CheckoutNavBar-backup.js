import * as React from "react";

// https://dev.to/tywenk/how-to-use-nested-routes-in-react-router-6-4jhd
//React Router provides a component called Outlet that renders a route's child component. <Outlet /> behaves a bit like props.children in standard React. <Outlet /> is the placeholder location for where the nested children routes will be rendered.
import { Outlet } from "react-router-dom";
import { Box, Tabs, Tab, CssBaseline, Grid, Paper } from "@mui/material";
import CartSummary from "./CartSummary";
import Checkout from "./Checkout";
import Payment from "./Payment";
import OrderReview from "./Review";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styled from "styled-components";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`checkout-${index}`}
      aria-labelledby={`checkout-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: ["Lato", "Oswald", "Roboto"],
  },
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
});

const CheckoutNavBar = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const tablist = [
    { tab: "Cart", page: <CartSummary /> },
    { tab: "Checkout", page: <Checkout /> },
    { tab: "Payment", page: <Payment /> },
    { tab: "Order", page: <OrderReview /> },
  ];

  // const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          height: "fit-content",
          pt: 5,
          minWidth: 50,
        }}
      >
        <StyledTabs
          sx={{
            borderRight: { xs: 1, sm: "none" },
            borderColor: { xs: "divider", sm: "none" },
          }}
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="checkout stages"
          scrollButtons={false}
        >
          {tablist &&
            tablist.map((tab, index) => (
              <Tab
                key={`tab-${tab.tab}`}
                label={tab.tab}
                sx={{
                  bgcolor: selectedTab === index ? "primary.light" : "none",
                  borderRight: {
                    xs: selectedTab === index ? 3 : 0,
                    sm: "none",
                  },
                }}
              />
            ))}
        </StyledTabs>
        <Box sx={{ flex: { xs: 1 } }}>
          {tablist &&
            tablist.map((tab, index) => (
              <TabPanel
                key={`tabpanel-${tab.tab}`}
                value={selectedTab}
                index={index}
                sx={{
                  width: { sx: "100%", sm: "90%" },
                  height: "auto",
                  minHeight: "95%",
                  mx: "auto",
                }}
              >
                {tab.page}
              </TabPanel>
            ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CheckoutNavBar;

const StyledTabs = styled(Tabs)`
  margin-left: auto;
  margin-right: auto;
  flex-direction: row !important;
  && .MuiTabs-flexContainer {
    @media (max-width: 600px) {
      flex-direction: column !important;
    }
  }
`;
