import * as React from "react";
import { Box, Paper, Stack, Typography, Button } from "@mui/material";
import ProductsPage from "../products/ProductsPage";

const bkImage_horizontal =
  "https://www.fitbit.com/global/content/dam/fitbit/global/marketing-pages/home/tablet/home-quiz-compare-banner-tablet.jpg";

const bkImage_vertical =
  "https://images.unsplash.com/photo-1522273500616-6b4757e4c184?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80";

const LandingPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        boxSizing: "border-box",
        height: "fit-content",
        minHeight: "90vh",
        // border: "1px solid red",
        backgroundImage: {
          xs: `url(${bkImage_vertical})`,
          sm: `url(${bkImage_horizontal})`,
        },
        backgroundSize: "cover",
        backgroundPosition: "top left",
        border: "none",
      }}
    >
      <Paper
        elevation={0}
        variant={"outlined"}
        sx={{
          width: "100%",
          minHeight: "90vh",
          backgroundImage: {
            xs: `url(${bkImage_vertical})`,
            sm: `url(${bkImage_horizontal})`,
          },
          backgroundSize: "cover",
          backgroundPosition: "top left",
          border: "none",
        }}
      >
        <Stack
          direction="column"
          alignItems={{ xs: "flex-end", md: "flex-start" }}
          sx={{
            width: { sx: "60%", sm: "45%", md: "48%" },
            ml: { sx: 0, sm: "50%" },
            py: { xs: 10, sm: 7, md: 5 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "60px", md: "80px" },
              lineHeight: 1.1,
              fontFamily: "Noto Sans",
              fontWeight: 700,
              color: "common.white",
              opacity: 0.8,
              textAlign: { xs: "right", md: "left" },
              // border: "1px solid red",
            }}
          >
            Track Your Progress this Spring{" "}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Roboto Condensed",
              lineHeight: 1.1,
              fontSize: { sm: "40px", md: "60px" },
              textAlign: { xs: "right", md: "left" },
              fontWeight: 400,
              color: "common.grey",
              bgcolor: "secondary.light",
              mt: 1,
              p: 0,

              // border: "1px solid red",
              // ml: { sx: 0, sm: "50%", md: "50%" },
            }}
          >
            Get{" "}
            <Typography variant="h2" color="primary" component={"span"}>
              15%
            </Typography>{" "}
            off Today!
          </Typography>
          <Button
            variant={"contained"}
            sx={{
              // ml: { sx: 0, sm: "70%", md: "70%" },
              mt: 3,
              width: { sm: "80%", md: "50%" },
            }}
          >
            <Typography variant="h5">Shop Now</Typography>
          </Button>
        </Stack>
      </Paper>
      <ProductsPage />
    </Box>
  );
};

export default LandingPage;
