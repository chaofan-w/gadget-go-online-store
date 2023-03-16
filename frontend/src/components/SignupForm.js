import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import lighttheme from "../themes/lightTheme";
import logoImg from "../assets/img/logo/gadget-go-icon.png";
import {
  postNewCustomer,
  selectAllCustomers,
} from "../features/customers/customersSlice";

import {
  fetchLoginCustomer,
  selectLoginCustomer,
} from "../features/loginCustomer/loginCustomerSlice";
import styled from "styled-components";
import {
  notificationClosed,
  notificationDisplayed,
} from "../features/notifications/notificationsSlice";

const formTheme = createTheme({
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link to="/" style={{ textDecoration: "none" }}>
        Gadget Go
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleNotification({ text, severity }) {
    await dispatch(
      notificationDisplayed({
        notification: {
          text: text,
          severity: severity,
        },
      })
    );

    setTimeout(function () {
      dispatch(notificationClosed());
    }, 3000);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    if (firstName && lastName && email && password) {
      const response = await postNewCustomer({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      await dispatch(response).then(async (result) => {
        if (result.payload.status === 200) {
          await handleNotification({
            text: result.payload.message,
            severity: "success",
          });
          navigate("/login");
        } else {
          await handleNotification({
            text: result.payload.message,
            severity: "error",
          });
        }
      });
    }
  };

  return (
    <ThemeProvider theme={lighttheme}>
      <Grid container component="main" sx={{ height: "90vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={7}
          component={Paper}
          elevation={6}
          square
          px={8}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}> */}
            <img
              src={logoImg}
              alt="Gadget-go logo"
              style={{ width: 40, height: 35, marginBottom: 10 }}
            />
            {/* </Avatar> */}
            <Typography component="h1" variant="h5" color="primary">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledFormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label={
                      <Typography variant="caption" color="primary">
                        I want to receive inspiration, marketing promotions and
                        updates via email.
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <Typography variant="body2">Sign Up</Typography>
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}

export const StyledTextField = styled(TextField)`
  /* https://styled-components.com/docs/basics#extending-styles */
  & .MuiFormLabel-root {
    font-family: Roboto !important;
  }
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  & .MuiTypography-root {
    font-family: Roboto !important;
    font-size: 12px;
  }
`;
