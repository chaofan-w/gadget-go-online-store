import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Stack } from "@mui/material";

export default function checkout({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  address1,
  setAddress1,
  address2,
  setAddress2,
  state,
  setState,
  city,
  setCity,
  country,
  setCountry,
  postCode,
  setPostCode,
  selectedTab,
  setSelectedTab,
  handleNotification,
}) {
  return (
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
      <Grid item xs={12} sm={6} sx={{ height: "auto" }}>
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First name"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          value={firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Last name"
          fullWidth
          autoComplete="family-name"
          variant="standard"
          value={lastName}
          onChange={(e) => setLastName(e.currentTarget.value)}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          required
          id="phone"
          name="phone"
          label="Phone"
          fullWidth
          variant="standard"
          value={phone}
          onChange={(e) => setPhone(e.currentTarget.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="address1"
          name="address1"
          label="Address line 1"
          fullWidth
          autoComplete="shipping address-line1"
          variant="standard"
          value={address1}
          onChange={(e) => setAddress1(e.currentTarget.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="address2"
          name="address2"
          label="Address line 2"
          fullWidth
          autoComplete="shipping address-line2"
          variant="standard"
          value={address2}
          onChange={(e) => setAddress2(e.currentTarget.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="city"
          name="city"
          label="City"
          fullWidth
          autoComplete="shipping address-level2"
          variant="standard"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="state"
          name="state"
          label="State/Province/Region"
          fullWidth
          variant="standard"
          value={state}
          onChange={(e) => setState(e.currentTarget.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="postCode"
          name="postCode"
          label="Zip / Postal code"
          fullWidth
          autoComplete="shipping postal-code"
          variant="standard"
          value={postCode}
          onChange={(e) => setPostCode(e.currentTarget.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="country"
          name="country"
          label="Country"
          fullWidth
          autoComplete="shipping country"
          variant="standard"
          value={country}
          onChange={(e) => setCountry(e.currentTarget.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack direction={{ md: "row", xs: "column" }} spacing={2}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
            sx={{ flex: 1 }}
          />
          <Button
            disabled={
              !firstName ||
              !lastName ||
              !phone ||
              !address1 ||
              !city ||
              !postCode ||
              !country
            }
            sx={{ flex: 1 }}
            variant="contained"
            onClick={() => setSelectedTab(selectedTab + 1)}
          >
            Procced To Payment
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
