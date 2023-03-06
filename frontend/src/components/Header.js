import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import { CssBaseline } from "@mui/material";
import { ShoppingBag, Login, Logout, LocalShipping } from "@mui/icons-material";
import MoreIcon from "@mui/icons-material/MoreVert";
import logoImg from "../assets/img/logo/gadget-go-icon-white.png";
import { useDispatch, useSelector } from "react-redux";
import { cartCleared, selectAllCarts } from "../features/carts/cartsSlice";
import {
  customerLogout,
  selectLoginCustomer,
} from "../features/loginCustomer/loginCustomerSlice";
import { useNavigate, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ordersCleared } from "../features/orders/ordersSlice";
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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector(selectAllCarts);
  const loginCustomer = useSelector(selectLoginCustomer);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // With Redux, you should be careful to avoid mutating state directly and instead use pure functions called reducers to update the state.
  const getCartAmount = () => {
    let item = 0;
    if (carts && carts.length > 0) {
      item += carts[0].products.reduce((pre, cur) => pre + cur.quantity, 0);
    }
    return item;
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Typography variant="body2" color="primary">
          Account
        </Typography>
      </MenuItem>

      <Link to="/orders" style={{ textDecoration: "none" }}>
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="body2" color="primary">
            Orders
          </Typography>
        </MenuItem>
      </Link>
      {loginCustomer.length > 0 ? (
        <MenuItem
          onClick={async () => {
            await dispatch(ordersCleared());
            await dispatch(cartCleared());
            await localStorage.clear();
            await dispatch(customerLogout());
            navigate("/");
            handleMenuClose();
          }}
        >
          <Typography variant="body2" color="primary">
            Logout
          </Typography>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleMenuClose}>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <Typography variant="body2" color="primary">
              Login
            </Typography>
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  const renderMenuLoggedOut = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <Typography variant="body2" color="primary">
            Login
          </Typography>
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose} sx={{ py: 0 }}>
        <IconButton
          size="medium"
          aria-label="show 4 new mails"
          color="secondary"
        >
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <Typography variant="body2" color="primary">
          Messages
        </Typography>
      </MenuItem>
      <Link to="/checkout" style={{ textDecoration: "none" }}>
        <MenuItem onClick={handleMobileMenuClose} sx={{ py: 0 }}>
          <IconButton
            disabled={carts.length === 0 || carts[0].products.length === 0}
            size="medium"
            aria-label="show num of items in carts"
            color="secondary"
            // onClick={() => navigate("/checkout")}
          >
            <Badge badgeContent={getCartAmount()} color="error">
              <ShoppingBag />
            </Badge>
          </IconButton>
          <Typography variant="body2" color="primary">
            Cart
          </Typography>
        </MenuItem>
      </Link>
      <MenuItem onClick={handleMobileMenuClose} sx={{ py: 0 }}>
        <IconButton
          size="medium"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="secondary"
        >
          <AccountCircle />
        </IconButton>
        <Typography variant="body2" color="primary">
          Account
        </Typography>
      </MenuItem>
      <Link to="/orders" style={{ textDecoration: "none" }}>
        <MenuItem onClick={handleMobileMenuClose} sx={{ py: 0 }}>
          <IconButton
            size="medium"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="secondary"
          >
            <LocalShipping />
          </IconButton>
          <Typography variant="body2" color="primary">
            Orders
          </Typography>
        </MenuItem>
      </Link>
      {loginCustomer.length > 0 ? (
        <MenuItem
          onClick={async () => {
            await dispatch(ordersCleared());
            await dispatch(cartCleared());
            await localStorage.clear();
            await dispatch(customerLogout());
            navigate("/");
            handleMobileMenuClose();
          }}
          sx={{ py: 0 }}
        >
          <IconButton
            size="medium"
            aria-label="logout"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="secondary"
          >
            <Logout />
          </IconButton>
          <Typography variant="body2" color="primary">
            Logout
          </Typography>
        </MenuItem>
      ) : (
        <Link
          to={"/login"}
          style={{
            textDecoration: "none",
          }}
        >
          <MenuItem onClick={handleMobileMenuClose} sx={{ py: 0 }}>
            <IconButton
              size="large"
              aria-label="login"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="secondary"
            >
              <Login />
            </IconButton>
            <Typography variant="body2" color="primary">
              Login
            </Typography>
            {/* </Link> */}
          </MenuItem>
        </Link>
      )}
    </Menu>
  );
  const renderMobileMenuLoggedOut = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link
        to={"/login"}
        style={{
          textDecoration: "none",
        }}
      >
        <MenuItem onClick={handleMobileMenuClose} sx={{ py: 0 }}>
          <IconButton
            size="large"
            aria-label="login"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="secondary"
          >
            <Login />
          </IconButton>
          <Typography variant="body2" color="primary">
            Login
          </Typography>
          {/* </Link> */}
        </MenuItem>
      </Link>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              aria-label="open drawer"
              sx={{ mr: 2, color: "secondary.light" }}
            >
              <MenuIcon />
            </IconButton> */}
            <Link to="/" style={{ textDecoration: "none" }}>
              <IconButton disableRipple>
                <img
                  src={logoImg}
                  alt="Gadget Go Logo"
                  style={{ width: 35, height: 30 }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    ml: 1,
                    color: "white",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  Gadget Go!
                </Typography>
              </IconButton>
            </Link>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {loginCustomer.length > 0 && (
                <>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    // color="secondary"
                    sx={{ color: "secondary.light" }}
                  >
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    disabled={
                      carts.length === 0 || carts[0].products.length === 0
                    }
                    size="large"
                    aria-label="show num of items in cart"
                    sx={{ color: "secondary.light" }}
                    onClick={() => navigate("/checkout")}
                  >
                    <Badge badgeContent={getCartAmount()} color="error">
                      <ShoppingBag />
                    </Badge>
                  </IconButton>
                </>
              )}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                sx={{ color: "secondary.light" }}
              >
                {loginCustomer.length > 0 ? <AccountCircle /> : <Login />}
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                sx={{ color: "secondary.light" }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {loginCustomer.length > 0
          ? renderMobileMenu
          : renderMobileMenuLoggedOut}
        {loginCustomer.length > 0 ? renderMenu : renderMenuLoggedOut}
      </Box>
    </ThemeProvider>
  );
}
