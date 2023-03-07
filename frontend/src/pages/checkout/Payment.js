import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Stack } from "@mui/material";

export default function Payment({
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  expDate,
  setExpDate,
  cvv,
  setCvv,
  selectedTab,
  setSelectedTab,
  handleNotification,
  total,
  discount,
}) {
  return (
    <Grid
      container
      sx={{ width: "100%", minWidth: 360, minHeight: "90vh" }}
      spacing={2}
    >
      <Grid item xs={12} md={8} sx={{ height: "auto" }}>
        <Grid
          container
          spacing={3}
          sx={{
            height: "auto",
            width: "100%",
            minWidth: 300,
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            borderRadius: 2,
            m: 0,
            py: 3,
            px: 3,
            bgcolor: "background.paper",
          }}
        >
          <Grid item xs={12} md={6} sx={{ height: "fit-content" }}>
            <TextField
              required
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              value={cardName}
              onChange={(e) => setCardName(e.currentTarget.value)}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ height: "fit-content" }}>
            <TextField
              required
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.currentTarget.value)}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ height: "fit-content" }}>
            <TextField
              required
              id="expDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              value={expDate}
              onChange={(e) => setExpDate(e.currentTarget.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              value={cvv}
              onChange={(e) => setCvv(e.currentTarget.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction={{ md: "row", xs: "column" }} spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveCard" value="yes" />
                }
                label="Remember credit card details for next time"
              />
              {/* <Button
                disabled={!cardName || !cardNumber || !expDate || !cvv}
                sx={{ flex: 1 }}
                variant="contained"
                onClick={() => setSelectedTab(selectedTab + 1)}
              >
                PROCCED TO REVIEW
              </Button> */}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          height: "fit-content",
          // border: "1px solid red",
          // px: { xs: 0, md: 2 },
        }}
      >
        <Stack
          direction="column"
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          spacing={2}
          sx={{
            height: "fit-content",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            borderRadius: 1,
            // mb: 3,
            // border: "1px solid red",
            px: 2,
            py: 3,
            bgcolor: "background.paper",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              width: "100%",
              height: 40,
              py: 1,
              borderBottom: `1px solid lightgrey`,
            }}
          >
            <Typography variant="body2">Total:</Typography>
            <Typography variant="body2">
              {`$${total.toFixed(2)}`}
              {/* {`$ ${(
                cart[0].products.reduce(
                  (accum, curr) => accum + curr.price * curr.quantity,
                  0
                ) * discount
              ).toFixed(2)}`} */}
              {discount < 1 && (
                <Typography
                  variant="caption"
                  sx={{ textDecoration: "line-through", color: "red", ml: 1 }}
                >
                  {/* {cart[0].products
                    .reduce(
                      (accum, curr) => accum + curr.price * curr.quantity,
                      0
                    )
                    .toFixed(2)} */}
                  {`$${(total / discount).toFixed(2)}`}
                </Typography>
              )}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              width: "100%",
              height: "fit-content",
              py: 1,
              borderBottom: `1px solid lightgrey`,
            }}
          >
            <Typography variant="body2">Tax:</Typography>
            <Stack
              direction="column"
              sx={{
                width: "60%",
              }}
            >
              <Typography
                variant="body2"
                textAlign={"right"}
              >{`QST(9.975%): $${(total * 0.0975).toFixed(2)}`}</Typography>
              <Typography variant="body2" textAlign={"right"}>{`GST(5%): $${(
                total * 0.05
              ).toFixed(2)}`}</Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              width: "100%",
              height: 40,
              py: 1,
              borderBottom: `1px solid lightgrey`,
            }}
          >
            <Typography variant="body2">Grand Total:</Typography>
            <Typography variant="subtitle1" fontWeight={"medium"}>{`$${(
              total * 1.14975
            ).toFixed(2)}`}</Typography>
          </Stack>
          <Button
            fullWidth
            disabled={!cardName || !cardNumber || !expDate || !cvv}
            variant="contained"
            onClick={() => setSelectedTab(selectedTab + 1)}
          >
            PROCCED TO REVIEW
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
