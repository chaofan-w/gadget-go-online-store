import * as React from "react";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Stack,
  Paper,
  Typography,
  Grid,
  CssBaseline,
  Button,
  Drawer,
  IconButton,
} from "@mui/material";
import { FilterList, FilterListOff } from "@mui/icons-material";
import {
  selectAllProducts,
  fetchProducts,
} from "../../features/products/productsSlice";
import { selectAllCategories } from "../../features/categories/categoriesSlice";

import ProductDetailCard from "./productDetailPage";
import { selectAllBodyLocations } from "../../features/body_locations/bodyLocationsSlice";
import { selectAllReviews } from "../../features/reviews/reviewsSlice";
import { selectAllCarts } from "../../features/carts/cartsSlice";
import { useParams } from "react-router-dom";
import PaginationCompo from "../../components/PaginationCompo";
import FilterDrawer from "../../components/FilterDrawer";
import { selectAllCompanies } from "../../features/compaines/companiesSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategories);
  const error = useSelector((state) => state.products.error);
  const productsStatus = useSelector((state) => state.products.status);
  const body_locations = useSelector(selectAllBodyLocations);
  const reviews = useSelector(selectAllReviews);
  const carts = useSelector(selectAllCarts);
  const companies = useSelector(selectAllCompanies);
  const [filter, setFilter] = React.useState({ all: "all" });

  const { currPage } = useParams();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const filterKey = filter && Object.keys(filter)[0];
        const filterValue = filter && filter[filterKey];
        const response = await fetchProducts({
          filterKey: filterKey,
          filterValue: filterValue,
          currPage: currPage,
        });
        dispatch(response);
        // }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [dispatch, currPage, filter]);

  let content;
  if (productsStatus === "loading") {
    content = <Spinner />;
  } else if (productsStatus === "succeeded") {
    content =
      products && products.length > 0 ? (
        // && categories
        <Box
          sx={{
            width: "100%",
            maxWidth: "100vw",
            boxSizing: "border-box",
            m: 0,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              height: "auto",
              gap: 4,
              flexGrow: 1,
              mx: "auto",
            }}
          >
            {products &&
              products.map((product) => (
                <ProductDetailCard
                  key={product._id}
                  product={product}
                  categories={categories}
                  body_locations={body_locations}
                  reviews={reviews}
                  carts={carts}
                />
              ))}
          </Stack>
        </Box>
      ) : (
        <div>{error}</div>
      );
  } else {
    content = <div>{error}</div>;
  }

  const [filterDrawerState, setFilterDrawerState] = React.useState({
    top: false,
    left: false,
  });

  const toggleFilterDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setFilterDrawerState({ ...filterDrawerState, [anchor]: open });
  };

  console.log(filter);

  const handleCloseFilter = async () => {
    await setFilter({ all: "all" });
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        // width: "100vw",
        // maxWidth: "100vw",
        // boxSizing: "border-box",
        m: 0,
        minHeight: "90vh",
        px: 5,
        pt: "2vh",
        pb: "2vh",
        bgcolor: "primary.light",
      }}
    >
      <CssBaseline />
      <Grid item xs={12} sx={{ position: "relative", textAlign: "right" }}>
        {Object.keys(filter)[0] === "all" ? (
          <IconButton
            size="large"
            sx={{ color: "primary.main" }}
            onClick={toggleFilterDrawer("top", true)}
          >
            <FilterList />
          </IconButton>
        ) : (
          <IconButton
            size="large"
            sx={{ color: "primary.main" }}
            onClick={handleCloseFilter}
          >
            <FilterListOff />
          </IconButton>
        )}
      </Grid>
      <Grid item xs={12}>
        {content}
      </Grid>
      <Grid item xs={12}>
        <PaginationCompo filter={filter} />
      </Grid>
      <Drawer
        anchor={"top"}
        open={filterDrawerState["top"]}
        onClose={toggleFilterDrawer("top", false)}
      >
        <Box
          sx={{
            minHeight: "80vh",
            p: 3,
            // mt: "10vh",
          }}
        >
          <FilterDrawer
            filterDrawerState={filterDrawerState}
            setFilterDrawerState={setFilterDrawerState}
            setFilter={setFilter}
            filterSource={categories}
            filterName={"Categories"}
            filterKey={"category"}
          />
          <FilterDrawer
            filterDrawerState={filterDrawerState}
            setFilterDrawerState={setFilterDrawerState}
            setFilter={setFilter}
            filterSource={body_locations}
            filterName={"Body Locations"}
            filterKey={"body_location"}
          />
          <FilterDrawer
            filterDrawerState={filterDrawerState}
            setFilterDrawerState={setFilterDrawerState}
            setFilter={setFilter}
            filterSource={companies}
            filterName={"Companies"}
            filterKey={"companyId"}
          />
        </Box>
      </Drawer>
    </Grid>
  );
};

export default ProductsPage;
