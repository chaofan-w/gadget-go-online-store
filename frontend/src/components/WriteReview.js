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
  ListItemButton,
  ListItem,
  Rating,
  TextField,
  Button,
} from "@mui/material";
import { BiBody } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { BsBagPlusFill, BsFillBagDashFill } from "react-icons/bs";
import AddToCartBtn from "../components/AddToCartBtn";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCategories } from "../features/categories/categoriesSlice";
import { selectAllBodyLocations } from "../features/body_locations/bodyLocationsSlice";
import {
  notificationDisplayed,
  notificationClosed,
} from "../features/notifications/notificationsSlice";
import {
  deleteProductReview,
  fetchReviews,
  patchProductReview,
  postNewReview,
  selectAllReviews,
} from "../features/reviews/reviewsSlice";
import { selectAllCarts } from "../features/carts/cartsSlice";
import { selectLoginCustomer } from "../features/loginCustomer/loginCustomerSlice";
import { SignalCellularNullRounded } from "@mui/icons-material";
import Spinner from "../components/Spinner";

export default function WriteReview({
  loginCustomer,
  product,
  anchor,
  setDrawerState,
  drawerStatre,
}) {
  async function handleNotification({ text, severity }) {
    await dispatch(
      notificationDisplayed({
        notification: {
          text: text,
          severity: severity,
        },
      })
    );

    setTimeout(function () {
      dispatch(notificationClosed());
    }, 3000);
  }
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const reviews = useSelector(selectAllReviews);
  const body_locations = useSelector(selectAllBodyLocations);
  const [productImg, setProductImg] = React.useState(null);
  const compareDate = new Date(2023, 1, 10);

  const [ratingValue, setRatingValue] = React.useState(0);
  const [comments, setComments] = React.useState("");
  const [categoryName, setCategoryName] = React.useState("");
  const [bodyLocationName, setBodyLocationName] = React.useState("");
  const [reviewIdValue, setReviewIdValue] = React.useState("");

  const handlePostNewReview = async (e) => {
    e.preventDefault();
    const customerId = loginCustomer[0]._id;
    const productId = product._id;
    const rating = ratingValue;
    const text = comments;

    if (customerId && productId && ratingValue) {
      const response = await postNewReview({
        customerId: customerId,
        productId: productId,
        rating: rating,
        text: text,
      });
      await dispatch(response).then(async (result) => {
        if (result.payload.status === 200) {
          await handleNotification({
            text: result.payload.message,
            severity: "success",
          });
          const updatedReviews = await fetchReviews();
          dispatch(updatedReviews);
          setDrawerState({ ...drawerStatre, [anchor]: false });
        } else {
          await handleNotification({
            text: result.payload.message,
            severity: "error",
          });
        }
      });
    }
  };
  const handlePatchReview = async (e) => {
    e.preventDefault();
    const reviewId = reviewIdValue;
    const rating = ratingValue;
    const text = comments;

    if (reviewId && ratingValue) {
      const response = await patchProductReview({
        reviewId: reviewId,
        rating: rating,
        text: text,
      });
      await dispatch(response).then(async (result) => {
        if (result.payload.status === 200) {
          await handleNotification({
            text: result.payload.message,
            severity: "success",
          });
          const updatedReviews = await fetchReviews();
          dispatch(updatedReviews);
          setDrawerState({ ...drawerStatre, [anchor]: false });
        } else {
          await handleNotification({
            text: result.payload.message,
            severity: "error",
          });
        }
      });
    }
  };
  const handleDeleteReview = async (e) => {
    e.preventDefault();
    const reviewId = reviewIdValue;

    if (reviewId) {
      const response = await deleteProductReview({
        reviewId: reviewId,
      });
      await dispatch(response).then(async (result) => {
        if (result.payload.status === 200) {
          await handleNotification({
            text: result.payload.message,
            severity: "success",
          });
          const updatedReviews = await fetchReviews();
          dispatch(updatedReviews);
          setDrawerState({ ...drawerStatre, [anchor]: false });
        } else {
          await handleNotification({
            text: result.payload.message,
            severity: "error",
          });
        }
      });
    }
  };

  React.useEffect(() => {
    const getReview = async () => {
      if (reviews) {
        const productReview = await reviews.find(
          (item) =>
            item.productId === product._id &&
            item.customerId === loginCustomer[0]._id
        );
        if (productReview) {
          setReviewIdValue(productReview._id);
          setRatingValue(productReview.rating);
          setComments(productReview.text);
        } else {
          setReviewIdValue("");
          setRatingValue("");
          setComments("");
        }
      }
    };
    getReview();
  }, [product, reviews, loginCustomer]);

  React.useEffect(() => {
    const getData = async () => {
      setProductImg(product.imageSrc);
      setRatingValue(0);
      setComments("");
    };

    getData();
  }, [product, categories, body_locations]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        if (categories) {
          setCategoryName(
            categories.find((item) => item._id === product.category).category
          );
        }
      } catch (err) {
        return;
      }
    };
    getData();
  }, [product, categories]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        if (body_locations) {
          setBodyLocationName(
            body_locations.find((item) => item._id === product.body_location)
              .body_location
          );
        }
      } catch (err) {
        return;
      }
    };
    getData();
  }, [product, body_locations]);

  return (
    <>
      {product && (
        <React.Fragment>
          <Card
            sx={{
              width: "100%",
              maxWidth: 360,
              minWidth: 300,
              my: 1,
              mx: "auto",
              height: { xs: "fit-content" },
            }}
          >
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
                    overflow: "auto",
                  }}
                >
                  <Typography variant="h6" sx={{ lineHeight: 1 }}>
                    {product.name}
                  </Typography>
                </Box>
              }
            />
            <Stack
              direction={{ xs: "column" }}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              sx={{
                width: "100%",
                p: 2,
                height: { xs: "fit-content" },
              }}
            >
              <Stack direction="row">
                <CardMedia
                  component="img"
                  sx={{ height: 200, width: 200 }}
                  // image={product.imageSrc}
                  image={productImg}
                  alt={`Id: ${product._id}`}
                />
                <List
                  sx={{
                    ml: { xs: 2 },
                    mt: { xs: 0 },
                    width: { xs: 40 },
                    p: 0,
                    height: { xs: 200 },
                    display: "flex",
                    flexDirection: { xs: "column" },
                    gap: 1,
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  {[1, 2, 3].map((img) => (
                    <ListItem
                      key={`imglist-${img}`}
                      sx={{ width: 40, height: 40, m: 0, p: 0 }}
                    >
                      <ListItemButton
                        sx={{ width: 40, height: 40, m: 0, p: 0 }}
                        onClick={() =>
                          setProductImg(
                            `https://loremflickr.com/320/240/gadget?${product._id}-${img}`
                          )
                        }
                      >
                        <img
                          src={`https://loremflickr.com/320/240/gadget?${product._id}-${img}`}
                          style={{
                            width: 40,
                            height: 40,
                            filter:
                              productImg ===
                              `https://loremflickr.com/320/240/gadget?${product._id}-${img}`
                                ? "grayscale(0)"
                                : "grayscale(100%)",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <ListItem sx={{ width: 40, height: 40, m: 0, p: 0 }}>
                    <ListItemButton
                      sx={{ width: 40, height: 40, m: 0, p: 0 }}
                      onClick={() => setProductImg(product.imageSrc)}
                    >
                      <img
                        src={product.imageSrc}
                        style={{
                          width: 40,
                          height: 40,
                          filter:
                            productImg === product.imageSrc
                              ? "grayscale(0)"
                              : "grayscale(100%)",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ pt: 1, mx: { xs: 0 } }}>
                {categoryName && (
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
                    <GoTasklist /> {categoryName}
                  </Typography>
                )}

                {bodyLocationName && (
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
                    <BiBody /> {bodyLocationName}
                  </Typography>
                )}
              </Stack>
              <Stack
                direction={"row"}
                alignItems="flex-start"
                justifyContent={"space-between"}
                sx={{ height: 300, flex: 1 }}
              >
                <CardContent
                  sx={{
                    width: { xs: 300 },
                    m: 0,
                    pt: { xs: 2 },
                    px: { xs: 0 },
                    display: "flex",
                    alignItems: { sm: "flex-end" },
                    justifyContent: { sm: "flex-end" },
                  }}
                >
                  <Stack
                    sx={{
                      width: { xs: 300 },
                      m: 0,
                    }}
                    direction={{ xs: "row" }}
                    alignItems={{ xs: "flex-end" }}
                    justifyContent={{ xs: "flex-start" }}
                  >
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      sx={{ mr: { xs: 2 } }}
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
              </Stack>
            </Stack>
            <Stack
              direction={"column"}
              alignItems="flex-start"
              sx={{ p: 1, width: "100%", maxWidth: 360, minWidth: 300 }}
            >
              <Box
                sx={{
                  m: 0,
                  px: 1,
                  width: "100%",
                }}
              >
                <Typography component="legend" variant="subtitle2">
                  Overall rating
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                />
              </Box>
              <Box
                noValidate
                autoComplete="off"
                sx={{
                  "& .MuiTextField-root": {
                    color: "red",
                    px: 1,
                  },
                  width: "100%",
                }}
              >
                <TextField
                  id="outlined-multiline-flexible"
                  placeholder="what did you like or dislike? what did you use this product for?"
                  multiline
                  fullWidth
                  maxRows={4}
                  sx={{
                    mt: 1,
                    "& .MuiInputBase-root": {
                      fontFamily: "Roboto",
                    },
                  }}
                  value={comments}
                  onChange={(e) => setComments(e.currentTarget.value)}
                />
              </Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ width: 320, mx: "auto" }}
              >
                <Button
                  type="button"
                  variant="contained"
                  disabled={!ratingValue}
                  fullWidth
                  sx={{ mx: "auto", my: 1, width: "40%" }}
                >
                  <Typography
                    variant="subtitle2"
                    onClick={(e) => {
                      if (reviewIdValue) {
                        handlePatchReview(e);
                      } else {
                        handlePostNewReview(e);
                      }
                    }}
                  >
                    {reviewIdValue ? "Update" : "Submit"}
                  </Typography>
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  fullWidth
                  sx={{ mx: "auto", my: 1, width: "40%" }}
                  disabled={!reviewIdValue}
                >
                  <Typography variant="subtitle2" onClick={handleDeleteReview}>
                    Delete
                  </Typography>
                </Button>
              </Stack>
            </Stack>
          </Card>
        </React.Fragment>
      )}
    </>
  );
}
