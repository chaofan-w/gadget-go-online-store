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
import { StyledTextField, StyledFormControlLabel } from "./SignupForm";
import {
  fetchLoginCustomer,
  selectLoginCustomer,
} from "../features/loginCustomer/loginCustomerSlice";
import logoImg from "../assets/img/logo/gadget-go-icon.png";
import {
  notificationDisplayed,
  notificationClosed,
} from "../features/notifications/notificationsSlice";

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        Gadget Go
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginCustomer = useSelector(selectLoginCustomer);

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
    const email = data.get("email");
    const password = data.get("password");

    if (email && password) {
      const response = await fetchLoginCustomer({
        email: email,
        password: password,
      });
      await dispatch(response).then(async (result) => {
        if (result.payload.status === 200) {
          await handleNotification({
            text: result.payload.message,
            severity: "success",
          });
          navigate("/");
        } else {
          await handleNotification({
            text: result.payload.message,
            severity: "error",
          });
        }
      });
    }
  };

  React.useEffect(() => {
    if (loginCustomer.length > 0) {
      localStorage.setItem("loginCustomer", JSON.stringify(loginCustomer[0]));
      navigate("/");
    }
  }, [loginCustomer]);

  return (
    <Grid container component="main" sx={{ height: "100vh", pt: "10vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1522273500616-6b4757e4c184?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={logoImg}
            alt="Gadget-go logo"
            style={{ width: 40, height: 35, marginBottom: 10 }}
          />
          <Typography component="h1" variant="h5" color="primary">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <StyledTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <StyledFormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={
                <Typography variant="subtitle2" color="primary">
                  Remember Me
                </Typography>
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <Typography variant="subtitle1">Sign In</Typography>
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" style={{ textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
