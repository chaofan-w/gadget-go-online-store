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
}) {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        sx={{
          height: "auto",
          width: "100%",
          minWidth: 300,
          p: 0,
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          borderRadius: 2,
          mb: 3,
          py: 3,
          px: 3,
        }}
      >
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
            <Button
              disabled={!cardName || !cardNumber || !expDate || !cvv}
              sx={{ flex: 1 }}
              variant="contained"
              onClick={() => setSelectedTab(selectedTab + 1)}
            >
              PROCCED TO REVIEW
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
