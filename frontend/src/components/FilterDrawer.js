import * as React from "react";

import {
  Grid,
  CssBaseline,
  Button,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";

export default function FilterDrawer({
  filterDrawerState,
  setFilterDrawerState,
  setFilter,
  filterSource,
  filterName,
  filterKey,
}) {
  return (
    <Grid container component="main" sx={{ my: 3 }}>
      <CssBaseline />
      <Grid item xs={12} container>
        <Grid item xs={12} sm={2}>
          <Tooltip title={`Filter by ${filterName}`} arrow placement="bottom">
            <Typography variant="subtitle1">{filterName}</Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={10} container>
          {filterSource &&
            filterSource.map((filter) => (
              <Grid key={filter._id} item xs={4} sm={3} md={2} lg={1}>
                <Button
                  value={filter._id}
                  sx={{
                    width: "100%",
                    height: 20,
                    overflow: "hidden",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "common.white",
                      height: "fit-content",
                      overflow: "visible",
                      py: 0,
                    },
                  }}
                  onClick={async (e) => {
                    // console.log(e.currentTarget.value);
                    await setFilter({ [filterKey]: e.currentTarget.value });
                    setFilterDrawerState({ ...filterDrawerState, top: false });
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      height: "inherit",
                      width: "100%",
                      m: 0,

                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      textAlign: "left",
                    }}
                  >
                    {filterKey === "companyId"
                      ? filter.name
                      : filter[filterKey]}
                  </Typography>
                </Button>
              </Grid>
            ))}
        </Grid>
        <Grid item container xs={12} sx={{ my: 1 }}>
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={10}>
            <Divider variant="middle" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
