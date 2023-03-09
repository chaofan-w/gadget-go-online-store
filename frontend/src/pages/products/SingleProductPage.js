import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Stack,
  List,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { BiBody } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { BsBagPlusFill, BsFillBagDashFill } from "react-icons/bs";
import AddToCartBtn from "../../components/AddToCartBtn";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../features/categories/categoriesSlice";
import { selectAllBodyLocations } from "../../features/body_locations/bodyLocationsSlice";
import { selectAllReviews } from "../../features/reviews/reviewsSlice";
import { selectAllCarts } from "../../features/carts/cartsSlice";
import { selectLoginCustomer } from "../../features/loginCustomer/loginCustomerSlice";
import { SignalCellularNullRounded } from "@mui/icons-material";
import Spinner from "../../components/Spinner";
import Comments from "./Comments";

export default function SingleProductPage({ loginCustomer }) {
  // console.log(productId);

  const categories = useSelector(selectAllCategories);
  const body_locations = useSelector(selectAllBodyLocations);
  const reviews = useSelector(selectAllReviews);
  const carts = useSelector(selectAllCarts);
  const [product, setProduct] = React.useState(null);
  const { productId } = useParams();
  console.log(product);

  React.useEffect(() => {
    const fetchProductById = async () => {
      try {
        if (productId) {
          await fetch(`/api/products/${productId}`)
            .then((res) => res.json())
            .then((result) => {
              if (result.status === 200) {
                setProduct(result.data[0]);
              } else {
                console.log(result.message);
              }
            });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProductById();
  }, [productId, setProduct]);

  const compareDate = new Date(2023, 1, 10);
  const [quantity, setQuantity] = React.useState(0);

  const reviewsByProduct =
    reviews.length > 0 &&
    reviews.filter((review) => review.productId === productId);

  return (
    <>
      {product && (
        <React.Fragment>
          <Card
            sx={{
              maxWidth: 560,
              minWidth: 300,
              my: 3,
              mx: "auto",
              position: "relative",
              height: 500,
            }}
          >
            {product.promotionPrice && (
              <Box
                sx={{
                  width: 60,
                  height: 30,
                  bgcolor: "primary.main",
                  position: "absolute",
                  top: 120,
                  left: 0,
                  zIndex: 10,
                  color: "white",
                  textAlign: "center",
                }}
              >
                <Typography variant="caption" sx={{ lineHeight: "30px" }}>
                  {`${Math.round(
                    ((product.price - product.promotionPrice) / product.price) *
                      100
                  )}% OFF`}
                </Typography>
              </Box>
            )}
            {new Date(product.arrivalDate) > compareDate && (
              <Box
                sx={{
                  width: 40,
                  height: 70,
                  bgcolor: "primary.main",
                  position: "absolute",
                  top: 120,
                  right: 10,
                  zIndex: 10,
                  color: "white",
                  textAlign: "center",
                }}
              >
                <Typography variant="caption" sx={{ lineHeight: "30px" }}>
                  New Arrival
                </Typography>
              </Box>
            )}
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Box
                  sx={{
                    width: "100%",
                    height: "fit-content",
                    overflow: "hidden",
                  }}
                >
                  <Typography variant="h6" sx={{ lineHeight: 1 }}>
                    {product.name}
                  </Typography>
                </Box>
              }
            />
            <Stack
              direction={"row"}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              sx={{ width: "100%", p: 2, height: 340 }}
            >
              <CardMedia
                component="img"
                sx={{ height: 300, width: 300 }}
                image={product.imageSrc}
                alt={`Id: ${product._id}`}
              />
              <Stack
                direction={"column"}
                alignItems="flex-end"
                justifyContent={"space-between"}
                sx={{ height: 300, flex: 1 }}
              >
                <Stack direction="row" spacing={2} sx={{ pt: 1, mx: 1 }}>
                  {/* <Typography variant="caption">{`Product Id: ${product._id}`}</Typography> */}
                  <Typography
                    variant="caption"
                    fontWeight={"bold"}
                    sx={{
                      color: "secondary.main",
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <GoTasklist />{" "}
                    {categories &&
                      categories.length > 0 &&
                      categories.find(
                        (category) => category._id === product.category
                      ).category}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight={"bold"}
                    sx={{
                      color: "secondary.main",
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <BiBody />{" "}
                    {body_locations &&
                      body_locations.length > 0 &&
                      body_locations.find(
                        (location) => location._id === product.body_location
                      ).body_location}
                  </Typography>
                </Stack>
                <CardContent>
                  <Stack direction={"column"} alignItems="flex-end">
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      // sx={{ mr: 2 }}
                    >
                      {`$ ${
                        product.promotionPrice
                          ? product.promotionPrice
                          : product.price
                      }
                    `}
                    </Typography>
                    {product.promotionPrice && (
                      <Typography
                        variant="subtitle1"
                        sx={{
                          textDecoration: "line-through",
                          // border: "1px solid red",
                          color: "red",
                        }}
                      >{`$ ${product.price}`}</Typography>
                    )}
                  </Stack>
                </CardContent>
                <Box width={100}>
                  <AddToCartBtn
                    carts={carts}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    product={product}
                  />
                </Box>
              </Stack>
            </Stack>

            <CardActions
              disableSpacing
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IconButton aria-label="add to favorites">
                <Stack direction={"row"} alignItems="center">
                  <FavoriteIcon
                    sx={{
                      color:
                        reviewsByProduct.length > 0 ? "secondary.main" : "grey",
                    }}
                  />
                  {reviewsByProduct.length > 0 && (
                    <React.Fragment>
                      <Typography
                        variant="body2"
                        fontWeight={"medium"}
                        sx={{ mr: 1 }}
                      >
                        {Math.round(
                          reviewsByProduct.reduce(
                            (accum, curr) => accum + curr.rating,
                            0
                          ) / reviewsByProduct.length,
                          1
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={"medium"}
                      >{`(${reviewsByProduct.length})`}</Typography>
                    </React.Fragment>
                  )}
                </Stack>
              </IconButton>
            </CardActions>
          </Card>
          <Divider
            orientation="horizontal"
            variant="middle"
            textAlign="center"
            sx={{ maxWidth: 560, mx: "auto" }}
          >
            <Typography variant="subtitle2">Reviews</Typography>
          </Divider>
          <List
            sx={{
              maxWidth: 560,
              minWidth: 300,
              my: 3,
              mx: "auto",
              bgcolor: "background.paper",
            }}
          >
            {reviewsByProduct &&
              reviewsByProduct.map((review) => <Comments review={review} />)}
          </List>
        </React.Fragment>
      )}
    </>
  );
}
