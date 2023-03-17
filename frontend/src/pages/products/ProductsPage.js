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
} from "@mui/material";
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

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategories);
  const error = useSelector((state) => state.products.error);
  const productsStatus = useSelector((state) => state.products.status);
  const body_locations = useSelector(selectAllBodyLocations);
  const reviews = useSelector(selectAllReviews);
  const carts = useSelector(selectAllCarts);
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
      <Grid item xs={12}>
        <Button
          onClick={async () => {
            const filterKey = Object.keys(filter)[0];
            await setFilter(
              filterKey === "all" ? { companyId: "13334" } : { all: "all" }
            );
          }}
          variant="contained"
        >
          filter
        </Button>
      </Grid>
      <Grid item xs={12}>
        {content}
      </Grid>
      <Grid item xs={12}>
        <PaginationCompo filter={filter} />
      </Grid>
    </Grid>
  );
};

export default ProductsPage;
