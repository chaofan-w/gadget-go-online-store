import * as React from "react";
import {
  filterUpdated,
  filterReset,
  selectAllProductsFilter,
} from "../features/productsFilter/productsFilterSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";

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
  const dispatch = useDispatch();
  const filter = useSelector(selectAllProductsFilter);

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
            filterSource.map((instance) => (
              <Grid key={instance._id} item xs={4} sm={3} md={2} lg={1}>
                <Button
                  value={instance._id}
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
                    await dispatch(
                      filterUpdated({
                        filterKey: filterKey,
                        filterValue: e.currentTarget.value,
                        currPage: 1,
                      })
                    );
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
                      ? instance.name
                      : instance[filterKey]}
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
